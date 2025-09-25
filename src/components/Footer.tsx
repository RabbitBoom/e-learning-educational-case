import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="note-list">
          <div className="note-list-head">
            <Logo className="mb-4.5" />
          </div>
          <ul>
            <li>
              <Icon icon="Email" />
              <span>hello@skillbridge.com</span>
            </li>
            <li>
              <Icon icon="Phone" />
              <span>+91 91813 23 2309</span>
            </li>
            <li>
              <Icon icon="Location" />
              <span>Somewhere in the World</span>
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="note-list">
            <div className="note-list-head">
              <h2>Home</h2>
            </div>
            <ul>
              <li>
                <Link href="#" target="_self">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="#" target="_self">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link href="#" target="_self">
                  Our Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" target="_self">
                  Our FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="note-list">
            <div className="note-list-head">
              <h2>About Us</h2>
            </div>
            <ul>
              <li>
                <Link href="#" target="_self">
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" target="_self">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="#" target="_self">
                  Our Goals
                </Link>
              </li>
            </ul>
          </div>
          <div className="note-list">
            <div className="note-list-head">
              <h2>Social Profiles</h2>
            </div>
            <ul>
              <li className="social-links">
                <a
                  href="https://www.facebook.com"
                  target="_target"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Icon icon="Facebook" />
                </a>
                <a
                  href="https://www.x.com"
                  target="_target"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <Icon icon="Twitter" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_target"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Icon icon="Linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">© 2025 Skillbridge. All rights reserved.</div>
    </footer>
  );
}
