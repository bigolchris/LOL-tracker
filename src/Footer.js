import React from 'react';

export function Footer() {
    return (
        <footer className="footer-container">
            <h3 className="contact-footer">
                How To Contact Me!
            </h3>
            <div className="links-container">
            <a class="fa fa-linkedin"className="links-footer" href="https://www.linkedin.com/in/christiandevsanchez/" target="_blank">Linkedin</a>
            <a class="fa fa-github" className="links-footer" href="https://github.com/bigolchris" target="_blank">Github</a>
            <a class='fa fa-envelope' className="links-footer" href="mailto:csanchez70793@gmail.com? subject=subject text">E-mail</a>
            </div>
        </footer>
    )
}