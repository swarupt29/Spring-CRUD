package com.crud.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.crud.entity.CrudEntity;
import com.crud.service.CrudService;

@RestController
@RequestMapping("/api")
public class CrudController {
	
	private static final Logger logger = LoggerFactory.getLogger(CrudController.class);
	
	@Autowired
	private CrudService crudService;
	
	@GetMapping
	public List<CrudEntity> getAllEntities() {
		logger.info("data fetched");
		return crudService.getAllEntity();
	}
	
	@GetMapping("/{id}")
	public CrudEntity getEntityById(@PathVariable Long id) {
		logger.info("data fetched for ID: {}", id);
		return crudService.getEntityById(id)
				.orElseThrow(() -> {
					logger.error("failed to fetch data for ID: {}", id);
					return new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
				});
	}
	
	@PostMapping
	public CrudEntity createEntity(@RequestBody CrudEntity crudEntity) {
		logger.info("data added: name={}, age={}, city={}", 
				crudEntity.getName(), crudEntity.getAge(), crudEntity.getCity());
		return crudService.saveEntity(crudEntity);
	}
	
	@PutMapping("/{id}")
	public CrudEntity updateEntity(@PathVariable Long id, @RequestBody CrudEntity crudEntity) {
		logger.info("data updated for ID: {}", id);
		return crudService.updateEntity(id, crudEntity);
	}
	
	@DeleteMapping("/{id}")
	public void deleteEntity(@PathVariable Long id) {
		logger.info("data deleted for ID: {}", id);
		crudService.deleteEntity(id);
	}
}