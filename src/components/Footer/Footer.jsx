import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="border-t border-white/10 px-6 pt-6 pb-6">
      <div className="grid grid-cols-6 gap-4">
        <p className="col-start-1 col-end-3 text-white/60 text-sm">
          © 2026 Climotion, Inc. All rights reserved.
        </p>
        <div className="col-span-1 col-end-7">
          <ul className="flex flex-row gap-5 text-lg">
            <li>
              <a href="https://github.com/kjicodes" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kjicodes/" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
