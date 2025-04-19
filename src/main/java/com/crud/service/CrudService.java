package com.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crud.entity.CrudEntity;
import com.crud.repository.CrudRepository;

@Service
public class CrudService {

	@Autowired
	private CrudRepository crudRepository;

	public List<CrudEntity> getAllEntity() {
		return crudRepository.findAll();
	}

	public Optional<CrudEntity> getEntityById(Long id) {
		return crudRepository.findById(id);
	}

	public CrudEntity saveEntity(CrudEntity crudEntity) {
		return crudRepository.save(crudEntity);
	}

	public void deleteEntity(Long id) {
		crudRepository.deleteById(id);
	}

	public CrudEntity updateEntity(Long id, CrudEntity entityDetails) {
		CrudEntity crudEntity = crudRepository.findById(id).orElseThrow();
		crudEntity.setName(entityDetails.getName());
		crudEntity.setAge(entityDetails.getAge());
		crudEntity.setCity(entityDetails.getCity());
		return crudRepository.save(crudEntity);
	}

}
