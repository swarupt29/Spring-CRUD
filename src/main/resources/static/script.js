// Constants
const ITEMS_PER_PAGE = 6;
const API_BASE_URL = 'http://localhost:8080/api'; 

// State management
const appState = {
    entities: [],
    filteredEntities: [],
    currentPage: 1,
    totalPages: 1,
    selectedId: null,
    viewMode: 'grid',
    sortBy: 'name-asc',
    searchTerm: '',
    isDarkMode: false
};

// DOM Elements
const elements = {
    form: document.getElementById('crud-form'),
    nameInput: document.getElementById('name'),
    ageInput: document.getElementById('age'),
    cityInput: document.getElementById('city'),
    submitBtn: document.getElementById('submit-btn'),
    resetBtn: document.getElementById('reset-btn'),
    dataList: document.getElementById('data-list'),
    emptyState: document.getElementById('empty-state'),
    addFirstEntity: document.getElementById('add-first-entity'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    prevPageBtn: document.getElementById('prev-page'),
    nextPageBtn: document.getElementById('next-page'),
    pageInfo: document.getElementById('page-info'),
    gridViewBtn: document.getElementById('grid-view-btn'),
    listViewBtn: document.getElementById('list-view-btn'),
    deleteModal: document.getElementById('delete-modal'),
    cancelDelete: document.getElementById('cancel-delete'),
    confirmDelete: document.getElementById('confirm-delete'),
    deleteEntityName: document.getElementById('delete-entity-name'),
    closeModal: document.querySelector('.close-modal'),
    themeSwitch: document.getElementById('theme-switch'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    toastIcon: document.getElementById('toast-icon'),
    nameError: document.getElementById('name-error'),
    ageError: document.getElementById('age-error'),
    cityError: document.getElementById('city-error'),
    pagination: document.getElementById('pagination')
};

// Initialize the application
function init() {
    loadEntitiesFromAPI();
    setupEventListeners();
    checkThemePreference();
}

// Load entities from backend API
async function loadEntitiesFromAPI() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch entities');
        appState.entities = await response.json();
        filterAndSortEntities();
        updateUI();
    } catch (error) {
        showToast('Error fetching entities: ' + error.message, 'error', 'fa-exclamation-circle');
    }
}

// Event listeners setup
function setupEventListeners() {
    elements.form.addEventListener('submit', handleFormSubmit);
    elements.resetBtn.addEventListener('click', clearForm);
    elements.searchInput.addEventListener('input', handleSearch);
    elements.sortSelect.addEventListener('change', handleSort);
    elements.prevPageBtn.addEventListener('click', goToPrevPage);
    elements.nextPageBtn.addEventListener('click', goToNextPage);
    elements.gridViewBtn.addEventListener('click', () => setViewMode('grid'));
    elements.listViewBtn.addEventListener('click', () => setViewMode('list'));
    elements.addFirstEntity.addEventListener('click', focusOnForm);
    elements.closeModal.addEventListener('click', closeDeleteModal);
    elements.cancelDelete.addEventListener('click', closeDeleteModal);
    elements.confirmDelete.addEventListener('click', confirmDeleteEntity);
    elements.themeSwitch.addEventListener('change', toggleDarkMode);
    elements.nameInput.addEventListener('input', () => validateInput('name'));
    elements.ageInput.addEventListener('input', () => validateInput('age'));
    elements.cityInput.addEventListener('input', () => validateInput('city'));
}

// Form handling
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const name = elements.nameInput.value.trim();
    const age = parseInt(elements.ageInput.value);
    const city = elements.cityInput.value.trim();
    
    const entity = { name, age, city };
    
    try {
        if (appState.selectedId !== null) {
            await updateEntity(appState.selectedId, entity);
            showToast('Entity updated successfully!', 'success', 'fa-check-circle');
        } else {
            await createEntity(entity);
            showToast('Entity created successfully!', 'success', 'fa-check-circle');
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error', 'fa-exclamation-circle');
    }
}

// Input validation
function validateInput(field) {
    const value = elements[field + 'Input'].value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'age':
            const age = parseInt(value);
            if (isNaN(age) || age < 1 || age > 120) {
                isValid = false;
                errorMessage = 'Age must be between 1 and 120';
            }
            break;
        case 'city':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'City must be at least 2 characters';
            }
            break;
    }
    
    elements[field + 'Error'].textContent = errorMessage;
    
    return isValid;
}

// Form validation
function validateForm() {
    const nameValid = validateInput('name');
    const ageValid = validateInput('age');
    const cityValid = validateInput('city');
    
    return nameValid && ageValid && cityValid;
}

// CRUD Operations (API-based)
async function createEntity(entity) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        });
        if (!response.ok) throw new Error('Failed to create entity');
        await loadEntitiesFromAPI();
        clearForm();
    } catch (error) {
        throw new Error('Failed to create entity: ' + error.message);
    }
}

async function updateEntity(id, updatedData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error('Failed to update entity');
        await loadEntitiesFromAPI();
        clearForm();
    } catch (error) {
        throw new Error('Failed to update entity: ' + error.message);
    }
}

async function deleteEntity(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete entity');
        await loadEntitiesFromAPI();
        showToast('Entity deleted successfully!', 'info', 'fa-trash-alt');
    } catch (error) {
        showToast('Error deleting entity: ' + error.message, 'error', 'fa-exclamation-circle');
    }
}

async function getEntityById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch entity');
        return await response.json();
    } catch (error) {
        showToast('Error fetching entity: ' + error.message, 'error', 'fa-exclamation-circle');
        return null;
    }
}

// UI Updates
function updateUI() {
    updatePagination();
    renderEntities();
    updateEmptyState();
}

function renderEntities() {
    elements.dataList.innerHTML = '';
    
    const startIndex = (appState.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageEntities = appState.filteredEntities.slice(startIndex, endIndex);
    
    if (pageEntities.length === 0 && appState.filteredEntities.length > 0) {
        appState.currentPage = 1;
        updateUI();
        return;
    }
    
    pageEntities.forEach(entity => {
        const entityCard = document.createElement('div');
        entityCard.classList.add('entity-card');
        entityCard.setAttribute('data-id', entity.id);
        
        if (appState.viewMode === 'grid') {
            entityCard.innerHTML = `
                <div class="entity-info">
                    <strong>${escapeHTML(entity.name)}</strong>
                    <p>Age: ${entity.age}</p>
                    <p>City: ${escapeHTML(entity.city)}</p>
                </div>
                <div class="entity-actions">
                    <button class="action-btn edit-btn" title="Edit" onclick="editEntityUI(${entity.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Delete" onclick="showDeleteModal(${entity.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        } else {
            entityCard.innerHTML = `
                <div class="entity-info">
                    <strong>${escapeHTML(entity.name)}</strong>
                    <p>Age: ${entity.age}</p>
                    <p>City: ${escapeHTML(entity.city)}</p>
                </div>
                <div class="entity-actions">
                    <button class="action-btn edit-btn" title="Edit" onclick="editEntityUI(${entity.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Delete" onclick="showDeleteModal(${entity.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        }
        
        elements.dataList.appendChild(entityCard);
    });
}

// Security - prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[tag]));
}

function updateEmptyState() {
    if (appState.entities.length === 0) {
        elements.emptyState.classList.remove('hidden');
        elements.dataList.classList.add('hidden');
        if (elements.pagination) {
            elements.pagination.classList.add('hidden');
        }
    } else {
        elements.emptyState.classList.add('hidden');
        elements.dataList.classList.remove('hidden');
        if (elements.pagination) {
            elements.pagination.classList.remove('hidden');
        }
    }
}

function filterAndSortEntities() {
    if (appState.searchTerm.trim() === '') {
        appState.filteredEntities = [...appState.entities];
    } else {
        const searchLower = appState.searchTerm.toLowerCase();
        appState.filteredEntities = appState.entities.filter(entity => 
            entity.name.toLowerCase().includes(searchLower) || 
            entity.city.toLowerCase().includes(searchLower) ||
            entity.age.toString().includes(searchLower)
        );
    }
    
    switch (appState.sortBy) {
        case 'name-asc':
            appState.filteredEntities.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            appState.filteredEntities.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'age-asc':
            appState.filteredEntities.sort((a, b) => a.age - b.age);
            break;
        case 'age-desc':
            appState.filteredEntities.sort((a, b) => b.age - a.age);
            break;
    }
    
    appState.totalPages = Math.max(1, Math.ceil(appState.filteredEntities.length / ITEMS_PER_PAGE));
    if (appState.currentPage > appState.totalPages) {
        appState.currentPage = appState.totalPages;
    }
}

// Pagination
function updatePagination() {
    elements.pageInfo.textContent = `Page ${appState.currentPage} of ${appState.totalPages}`;
    elements.prevPageBtn.disabled = appState.currentPage <= 1;
    elements.nextPageBtn.disabled = appState.currentPage >= appState.totalPages;
}

function goToPrevPage() {
    if (appState.currentPage > 1) {
        appState.currentPage--;
        updateUI();
    }
}

function goToNextPage() {
    if (appState.currentPage < appState.totalPages) {
        appState.currentPage++;
        updateUI();
    }
}

// View modes
function setViewMode(mode) {
    appState.viewMode = mode;
    elements.dataList.className = `data-list ${mode}-view`;
    if (mode === 'grid') {
        elements.gridViewBtn.classList.add('active');
        elements.listViewBtn.classList.remove('active');
    } else {
        elements.gridViewBtn.classList.remove('active');
        elements.listViewBtn.classList.add('active');
    }
    renderEntities();
}

// Search and sort
function handleSearch(e) {
    appState.searchTerm = e.target.value;
    appState.currentPage = 1;
    filterAndSortEntities();
    updateUI();
}

function handleSort(e) {
    appState.sortBy = e.target.value;
    filterAndSortEntities();
    updateUI();
}

// Form helpers
function clearForm() {
    elements.form.reset();
    appState.selectedId = null;
    elements.submitBtn.innerHTML = '<i class="fas fa-plus"></i> Create Entity';
    elements.nameError.textContent = '';
    elements.ageError.textContent = '';
    elements.cityError.textContent = '';
}

function focusOnForm() {
    elements.nameInput.focus();
    window.scrollTo({
        top: elements.form.offsetTop - 20,
        behavior: 'smooth'
    });
}

// Edit UI state
async function editEntityUI(id) {
    const entity = await getEntityById(id);
    if (entity) {
        appState.selectedId = id;
        elements.nameInput.value = entity.name;
        elements.ageInput.value = entity.age;
        elements.cityInput.value = entity.city;
        elements.submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Entity';
        focusOnForm();
    }
}

// Delete modal
function showDeleteModal(id) {
    const entity = appState.entities.find(entity => entity.id === id);
    if (entity) {
        appState.selectedId = id;
        elements.deleteEntityName.textContent = entity.name;
        elements.deleteModal.classList.add('show');
    }
}

function closeDeleteModal() {
    elements.deleteModal.classList.remove('show');
}

function confirmDeleteEntity() {
    if (appState.selectedId !== null) {
        deleteEntity(appState.selectedId);
        closeDeleteModal();
        appState.selectedId = null;
    }
}

// Dark mode toggle
function toggleDarkMode() {
    appState.isDarkMode = elements.themeSwitch.checked;
    if (appState.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', appState.isDarkMode);
}

function checkThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        appState.isDarkMode = savedTheme === 'true';
        elements.themeSwitch.checked = appState.isDarkMode;
        if (appState.isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            appState.isDarkMode = true;
            elements.themeSwitch.checked = true;
            document.body.classList.add('dark-mode');
        }
    }
}

// Toast notifications
function showToast(message, type, icon) {
    elements.toast.className = 'toast ' + type;
    elements.toastMessage.textContent = message;
    elements.toastIcon.className = `fas ${icon}`;
    elements.toast.classList.remove('hidden');
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// Expose functions for event handling
window.editEntityUI = editEntityUI;
window.showDeleteModal = showDeleteModal;

// Initialize the app
document.addEventListener('DOMContentLoaded', init);