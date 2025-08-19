import { useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header>
        <nav className="top-nav">
          <a href="#" className="logo-left" aria-label="Início">
            <img src="/globo.png" alt="Synapse" />
          </a>
          <div
            className={`hamburger-menu ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            role="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#equipe">Equipe</a></li>
            <li><a href="#projeto">Projeto</a></li>
            <li><a href="#depoimento">Depoimento</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <div className="flags-container">
            <a href="#" className="flag" data-lang="pt"><img src="/brasil.png" alt="Português" title="Português" /></a>
            <a href="#" className="flag" data-lang="es"><img src="/espanha.png" alt="Español" title="Español" /></a>
            <a href="#" className="flag" data-lang="en"><img src="/estados-unidos.png" alt="English" title="English" /></a>
          </div>
        </nav>
      </header>

      <div className="container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      {/* Seção Sobre Nós */}
      <section id="sobre" className="section">
        <div className="section-container">
          <h2 className="section-title">Sobre Nós</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                A Synapse é uma empresa voltada ao desenvolvimento de soluções tecnológicas baseadas em Inteligência Artificial, com especialização em:
              </p>
              <ul className="specialties-list">
                <li><i className="fas fa-brain specialty-icon"></i><strong>Rede neural:</strong> Modelos computacionais inspirados no funcionamento do cérebro humano, formados por neurônios artificiais interconectados para aprender com dados e tomar decisões.</li>
                <li><i className="fas fa-cogs specialty-icon"></i><strong>Automação de processos:</strong> Aplicação da IA para tornar tarefas repetitivas mais rápidas, inteligentes e eficientes, permitindo que processos aprendam e se adaptem.</li>
                <li><i className="fas fa-chart-line specialty-icon"></i><strong>Otimização de decisões:</strong> Análise de padrões e simulação de cenários para sugerir ou automatizar as melhores escolhas em negócios, saúde, logística e finanças.</li>
                <li><i className="fas fa-laptop-code specialty-icon"></i><strong>Front-End:</strong> Desenvolvimento da camada visual com HTML, CSS e JavaScript, criando interfaces intuitivas e responsivas.</li>
                <li><i className="fas fa-server specialty-icon"></i><strong>Back-End:</strong> Processamento de dados, armazenamento em bancos de dados e garantia do funcionamento correto dos sistemas com linguagens como Python, Java e Node.js.</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="/homem.png" alt="Equipe Synapse" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Equipe */}
      <section id="equipe" className="section">
        <div className="section-container">
          <h2 className="section-title">Equipe Synapse</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/rogerio.png" alt="Rogerio" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Rogerio Reis</h3>
                <p className="member-position">CTO</p>
                <p className="member-bio">Como CTO, Rogério lidera a visão tecnológica e a inovação, transformando estratégias em soluções de ponta que impulsionam o crescimento e a diferenciação no mercado.</p>
                <div className="member-social"></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/bryan.jpeg" alt="Bryan Malvezzi" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Bryan Malvezzi</h3>
                <p className="member-position">CEO</p>
                <p className="member-bio">Bryan é o CEO que inspira e executa, focado em construir equipes de alta performance e em criar um impacto duradouro. Sob sua liderança, alcança novos patamares de sucesso e relevância.</p>
                <div className="member-social"></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/joao.png" alt="João Vitor Oliveira" />
              </div>
              <div className="member-info">
                <h3 className="member-name">João Vitor Oliveira</h3>
                <p className="member-position">COO</p>
                <p className="member-bio">Responsável por transformar visão em operação com foco em inovação, performance e crescimento sustentável.</p>
                <div className="member-social"></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/eu.png" alt="Felipe Medeiros" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Felipe Medeiros</h3>
                <p className="member-position">Engenheiro da Computação</p>
                <p className="member-bio">Engenheiro da Computação com foco em projetar sistemas completos, integrando hardware e software, IA e automação. Atua do planejamento à implementação, garantindo desempenho, confiabilidade e escalabilidade.</p>
                <div className="member-social"></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/bruno.png" alt="Bruno" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Bruno Assoni</h3>
                <p className="member-position">Engenheiro de Software</p>
                <p className="member-bio">Engenheiro de Software especializado em arquitetura, qualidade e entrega contínua. Define padrões, projeta soluções escaláveis e lidera o ciclo de vida do software com ênfase em performance, segurança e manutenção.</p>
                <div className="member-social"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Projetos */}
      <section id="projeto" className="section">
        <div className="section-container">
          <h2 className="section-title">Nossos Projetos</h2>
          <div className="projects-grid">
            <div className="project-card" data-category="residencial">
              <div className="project-image-container">
                <img src="/drakkar.png" alt="Site Drakkarboats" />
                <div className="project-overlay"></div>
              </div>
              <div className="project-content">
                <h3>Site Drakkarboats</h3>
                <p>Desenvolvimento de site para a empresa Drakkarboats, com visual moderno e funcionalidades otimizadas para o usuário.</p>
                <div className="project-meta">
                  <span><i className="fas fa-map-marker-alt"></i> Florida, Estados Unidos</span>
                  <span><i className="fas fa-calendar-alt"></i> 2025</span>
                </div>
                <div className="project-actions">
                  <a className="project-btn" href="https://drakkarboats.com/pt/" target="_blank" rel="noopener">Ver Projeto</a>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="comercial">
              <div className="project-image-container">
                <img src="/drakkarsistema.png" alt="Sistema DrakkarBoats" />
                <div className="project-overlay"></div>
              </div>
              <div className="project-content">
                <h3>Sistema Drakkarboats</h3>
                <p>Sistema de gestão para a empresa Drakkarboats, com estoque, vendas, orçamentos, ordens de pós vendas, painel admnistrativo e relatórios.</p>
                <div className="project-meta">
                  <span><i className="fas fa-map-marker-alt"></i> Florida, Estados Unidos</span>
                  <span><i className="fas fa-calendar-alt"></i> 2025</span>
                </div>
                <div className="project-actions">
                  <a className="project-btn disabled" href="#" rel="noopener" aria-disabled="true">Ver Projeto</a>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="urbano">
              <div className="project-image-container">
                <img src="/pierfans.png" alt="Site PierFans" />
                <div className="project-overlay"></div>
              </div>
              <div className="project-content">
                <h3>Site PierFans</h3>
                <p>Desenvolvimento de site para a empresa PierFans, com foco em vendas de conteúdos adultos </p>
                <div className="project-meta">
                  <span><i className="fas fa-map-marker-alt"></i> Rio de Janeiro, RJ</span>
                  <span><i className="fas fa-calendar-alt"></i> 2025</span>
                </div>
                <div className="project-actions">
                  <a className="project-btn" href="https://pierfans.com.br/" target="_blank" rel="noopener">Ver Projeto</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Depoimentos */}
      <section id="depoimento" className="section">
        <div className="section-container">
          <h2 className="section-title">Depoimentos</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">A Synapse revolucionou nossa operação com suas soluções de IA. A automação de processos nos permitiu economizar tempo e recursos significativos.</p>
                <div className="testimonial-author">
                  <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Cliente 1" className="testimonial-avatar" />
                  <div className="author-info">
                    <h4>Ana Silva</h4>
                    <p>Diretora de Tecnologia, InovaTech</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">O trabalho da equipe de desenvolvimento foi excepcional. Entenderam perfeitamente nossas necessidades e entregaram além do esperado.</p>
                <div className="testimonial-author">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Cliente 2" className="testimonial-avatar" />
                  <div className="author-info">
                    <h4>Carlos Mendes</h4>
                    <p>CEO, Digital Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">A parceria com a Synapse tem sido fundamental para o nosso crescimento. Suas soluções em IA nos deram uma vantagem competitiva no mercado.</p>
                <div className="testimonial-author">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Cliente 3" className="testimonial-avatar" />
                  <div className="author-info">
                    <h4>Juliana Costa</h4>
                    <p>Gerente de Inovação, TechForward</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="testimonial-btn prev" aria-label="Anterior"><i className="fas fa-chevron-left"></i></button>
            <div className="testimonial-indicators">
              <span className="testimonial-indicator active"></span>
              <span className="testimonial-indicator"></span>
              <span className="testimonial-indicator"></span>
            </div>
            <button className="testimonial-btn next" aria-label="Próximo"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="section">
        <div className="section-container">
          <h2 className="section-title">Entre em Contato</h2>
          <div className="contact-wrapper">
            <div className="contact-container">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="contact-details">
                    <h3>Localização</h3>
                    <p>Av. Paulista, 1000 - São Paulo, SP</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="contact-details">
                    <h3>Whatsapp</h3>
                    <p>+55 (11) 99267-1271</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-details">
                    <h3>E-mail</h3>
                    <p>synapse@synapsesofware.com.br</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon"><i className="fas fa-clock"></i></div>
                  <div className="contact-details">
                    <h3>Horário de Atendimento</h3>
                    <p>Segunda a Sexta: 9h às 18h</p>
                  </div>
                </div>
                <div className="social-media-contact">
                  <h3>Siga-nos</h3>
                  <div className="social-icons-container">
                    <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h3 className="form-title">Envie sua mensagem</h3>
                <form id="contactForm">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nome Completo</label>
                      <input type="text" id="name" name="name" placeholder="Seu nome completo" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input type="email" id="email" name="email" placeholder="Seu e-mail" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Telefone</label>
                      <input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Assunto</label>
                      <input type="text" id="subject" name="subject" placeholder="Assunto da mensagem" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mensagem</label>
                    <textarea id="message" name="message" rows="5" placeholder="Digite sua mensagem aqui..." required></textarea>
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="btn-submit">
                      <span>Enviar Mensagem</span>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="map-container">
              <div className="map-overlay">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976521972473!2d-46.65390548502406!3d-23.563203184683068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1625764215576!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="section-container footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/globo.png" alt="Synapse" className="footer-logo-img" />
              </div>
              <p className="footer-about">A Synapse é uma empresa especializada em soluções tecnológicas baseadas em Inteligência Artificial, focada em inovação e excelência em todos os projetos.</p>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Links Rápidos</h3>
              <ul className="footer-links">
                <li><a href="#sobre">Sobre Nós</a></li>
                <li><a href="#equipe">Nossa Equipe</a></li>
                <li><a href="#projeto">Projetos</a></li>
                <li><a href="#depoimento">Depoimentos</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Serviços</h3>
              <ul className="footer-links">
                <li><a href="#">Redes Neurais</a></li>
                <li><a href="#">Automação de Processos</a></li>
                <li><a href="#">Otimização de Decisões</a></li>
                <li><a href="#">Desenvolvimento Front-End</a></li>
                <li><a href="#">Desenvolvimento Back-End</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Contato</h3>
              <ul className="footer-contact-list">
                <li><i className="fas fa-map-marker-alt"></i><span>Av. Paulista, 1000 - São Paulo, SP</span></li>
                <li><i className="fas fa-phone-alt"></i><span>+55 (11) 99267-1271</span></li>
                <li><i className="fas fa-envelope"></i><span>synapse@synapsesofware.com.br</span></li>
                <li><i className="fas fa-clock"></i><span>Segunda a Sexta: 9h às 18h</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="section-container footer-bottom-content">
            <p className="copyright">&copy; 2025 Synapse. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/5511992671271" className="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp">
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </a>
    </>
  )
}

export default App
