"use client";
import Link from "next/link";
import { socialLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="w-full bg-bg border-t border-border pt-12 pb-8 z-50 relative">
      <div className="max-w-[1400px] mx-auto section-padding-x flex flex-col gap-10">

        {/* Main Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <p className="font-heading font-bold text-text-primary text-xl uppercase tracking-tight mb-4">Sunil Karki</p>
            <p className="text-text-secondary text-sm font-light max-w-xs mb-6 leading-relaxed">
              Software engineer & AI automation specialist building solutions that drive ROI.
            </p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-text-muted hover:text-text-primary transition-colors"
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-6">Work</h3>
            <ul className="flex flex-col gap-3 text-text-secondary text-sm">
              <li><Link href="/#about" className="hover:text-text-primary transition-colors">About</Link></li>
              <li><Link href="/#work" className="hover:text-text-primary transition-colors">Projects</Link></li>
              <li><Link href="/#insights" className="hover:text-text-primary transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-text-muted uppercase mb-6">Connect</h3>
            <ul className="flex flex-col gap-3 text-text-secondary text-sm">
              <li><Link href="/blog" className="hover:text-text-primary transition-colors">Read Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-xs text-text-muted gap-4 font-mono tracking-wider uppercase">
          <p>&copy; {new Date().getFullYear()} Sunil Karki</p>
          <p>Designed & built with precision.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
