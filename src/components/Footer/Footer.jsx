import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="border-t border-white/10 py-6">
      <div className="flex items-center justify-center gap-10">
        <p className="text-white/60 text-sm">
          © 2026 Climotion, Inc. All rights reserved.
        </p>
        <div className="">
          <ul className="flex flex-row gap-5 text-xl">
            <li>
              <a className="hover:opacity-75" href="https://github.com/kjicodes" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </li>
            <li>
              <a className="hover:opacity-75" href="https://www.linkedin.com/in/kjicodes/" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
