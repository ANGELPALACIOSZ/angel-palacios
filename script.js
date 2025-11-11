// Datos de mentores de ejemplo
const mentorsData = [
    {
        id: 1,
        name: "María García",
        specialty: "matematicas",
        specialties: ["Cálculo", "Álgebra Lineal"],
        rating: 4.8,
        experience: "3 años",
        availability: "Mañanas y tardes"
    },
    {
        id: 2,
        name: "Carlos Ruiz",
        specialty: "programacion",
        specialties: ["JavaScript", "Node.js", "React"],
        rating: 4.9,
        experience: "4 años",
        availability: "Fines de semana"
    },
    {
        id: 3,
        name: "Ana López",
        specialty: "ciencias",
        specialties: ["Física", "Química"],
        rating: 4.7,
        experience: "2 años",
        availability: "Tardes"
    },
    {
        id: 4,
        name: "David Martínez",
        specialty: "idiomas",
        specialties: ["Inglés", "Francés"],
        rating: 4.6,
        experience: "5 años",
        availability: "Mañanas"
    },
    {
        id: 5,
        name: "Laura Torres",
        specialty: "programacion",
        specialties: ["Python", "Data Science"],
        rating: 4.9,
        experience: "3 años",
        availability: "Noches"
    },
    {
        id: 6,
        name: "Jorge Silva",
        specialty: "matematicas",
        specialties: ["Estadística", "Probabilidad"],
        rating: 4.5,
        experience: "2 años",
        availability: "Tardes"
    }
];

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    loadMentors();
    initializeAnimations();
    initializeNavigation();
    
    // Add event listeners for search
    document.getElementById('searchInput').addEventListener('input', filterMentors);
    document.getElementById('filterArea').addEventListener('change', filterMentors);
});

// Cargar mentores en el grid
function loadMentors(mentors = mentorsData) {
    const grid = document.getElementById('mentorsGrid');
    grid.innerHTML = '';
    
    mentors.forEach((mentor, index) => {
        const mentorCard = createMentorCard(mentor);
        grid.appendChild(mentorCard);
        
        // Add staggered animation
        setTimeout(() => {
            mentorCard.classList.add('fade-in');
        }, index * 100);
    });
}

// Crear tarjeta de mentor
function createMentorCard(mentor) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    
    const stars = '★'.repeat(Math.floor(mentor.rating)) + '☆'.repeat(5 - Math.floor(mentor.rating));
    
    card.innerHTML = `
        <div class="mentor-card">
            <div class="mentor-header">
                <div class="mentor-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <h5>${mentor.name}</h5>
                <div class="rating">${stars} ${mentor.rating}</div>
            </div>
            <div class="mentor-body">
                <p><strong>Especialidades:</strong></p>
                ${mentor.specialties.map(s => `<span class="specialty-badge">${s}</span>`).join('')}
                <p class="mt-3"><i class="fas fa-briefcase me-2"></i> ${mentor.experience} de experiencia</p>
                <p><i class="fas fa-clock me-2"></i> ${mentor.availability}</p>
                <button class="btn btn-primary-custom w-100 mt-3" onclick="scheduleSession('${mentor.name}')">
                    <i class="fas fa-calendar-plus me-2"></i>Agendar Sesión
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filtrar mentores
function filterMentors() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const areaFilter = document.getElementById('filterArea').value;
    
    const filteredMentors = mentorsData.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm) || 
                             mentor.specialties.some(s => s.toLowerCase().includes(searchTerm));
        const matchesArea = !areaFilter || mentor.specialty === areaFilter;
        
        return matchesSearch && matchesArea;
    });
    
    loadMentors(filteredMentors);
}

// Simular agendamiento de sesión
function scheduleSession(mentorName) {
    // Crear modal con Bootstrap
    const modalHtml = `
        <div class="modal fade" id="scheduleModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Agendar Sesión con ${mentorName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="scheduleForm">
                            <div class="mb-3">
                                <label class="form-label">Fecha y Hora</label>
                                <input type="datetime-local" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tema a tratar</label>
                                <select class="form-select" required>
                                    <option>Dudas de clase</option>
                                    <option>Preparación de examen</option>
                                    <option>Orientación profesional</option>
                                    <option>Proyectos prácticos</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Modalidad</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="modality" value="online" checked>
                                    <label class="form-check-label">Online (Google Meet)</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="modality" value="presencial">
                                    <label class="form-check-label">Presencial</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary-custom" onclick="confirmSession('${mentorName}')">
                            <i class="fas fa-check me-2"></i>Confirmar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('scheduleModal'));
    modal.show();
    
    // Eliminar modal del DOM cuando se cierra
    document.getElementById('scheduleModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Confirmar sesión
function confirmSession(mentorName) {
    // Cerrar modal
    bootstrap.Modal.getInstance(document.getElementById('scheduleModal')).hide();
    
    // Mostrar alerta de éxito
    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i>
            <strong>¡Sesión confirmada!</strong><br>
            Se ha agregado a tu Google Calendar
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) alert.remove();
    }, 5000);
}

// Simular login con Google
function simulateLogin() {
    const btn = event.target;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Conectando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fab fa-google me-2"></i>✅ Conectado';
        btn.classList.remove('btn-light');
        btn.classList.add('btn-success');
        
        // Mostrar notificación
        showNotification('✅ Autenticado exitosamente con Google', 'success');
        
        // Cambiar texto del botón después de 2 segundos
        setTimeout(() => {
            btn.innerHTML = '<i class="fab fa-google me-2"></i>Dashboard';
            btn.disabled = false;
        }, 2000);
    }, 2000);
}

// Mostrar demo
function showDemo() {
    // Scroll a la sección de mentores
    document.getElementById('mentors').scrollIntoView({ behavior: 'smooth' });
    
    // Resaltar la sección
    const mentorsSection = document.getElementById('mentors');
    mentorsSection.style.boxShadow = '0 0 0 3px var(--accent-color)';
    setTimeout(() => {
        mentorsSection.style.boxShadow = '';
    }, 2000);
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    const notificationHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', notificationHtml);
    
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) alert.remove();
    }, 4000);
}

// Inicializar animaciones
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Inicializar navegación
function initializeNavigation() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'btn btn-primary-custom position-fixed bottom-0 end-0 m-3 d-none';
scrollToTopBtn.style.zIndex = '999';
scrollToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('d-none');
    } else {
        scrollToTopBtn.classList.add('d-none');
    }
});