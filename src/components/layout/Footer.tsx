"use client";
import Link from "next/link";
import { styles } from "@/styles";
import { socialLinks } from "@/constants";
import SocialIcon from "@/components/ui/SocialIcon";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-bg border-t border-border pt-12 pb-8 z-50 relative mt-12">
      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col gap-10`}>
        
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-border pb-10">
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to scale your digital presence?</h2>
            <p className="text-text-secondary text-lg">Let's build something amazing together. I'm currently available for freelance work and new opportunities.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href="#contact" className="btn-primary px-8 py-3 rounded-xl whitespace-nowrap text-center">
              Start a Project
            </a>
            <a 
              href="https://wa.me/9779767663483" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-8 py-3 rounded-xl whitespace-nowrap transition-colors shadow-sm"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Main Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <p className="text-text-primary font-bold text-2xl mb-4">Sunil Karki</p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => {
                let brandColor = "text-text-primary hover:text-gray-500";
                if (link.label.includes("LinkedIn")) brandColor = "text-[#0A66C2] hover:opacity-80";
                if (link.label.includes("Facebook")) brandColor = "text-[#1877F2] hover:opacity-80";
                if (link.label.includes("Instagram")) brandColor = "text-[#E4405F] hover:opacity-80";
                if (link.label.includes("GitHub")) brandColor = "text-text-primary hover:opacity-80";
                
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={`text-2xl transition-all ${brandColor}`}>
                    <link.icon />
                  </a>
                );
              })}
            </div>
            <p className="text-text-secondary max-w-xs mb-6 leading-relaxed">
              Full-stack software engineer & AI automation specialist building solutions that drive ROI.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border w-fit">
              <span className="text-text-secondary text-xs font-medium">Built with</span>
              <span className="text-text-primary text-xs font-bold">Next.js & Tailwind</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-text-primary font-semibold mb-6">Work</h3>
            <ul className="flex flex-col gap-4 text-text-secondary text-sm">
              <li><Link href="/#about" className="hover:text-text-primary transition-colors">Services</Link></li>
              <li><Link href="/#work" className="hover:text-text-primary transition-colors">Projects</Link></li>
              <li><Link href="/uses" className="hover:text-text-primary transition-colors">My Arsenal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-6">Connect</h3>
            <ul className="flex flex-col gap-4 text-text-secondary text-sm">
              <li><Link href="/blog" className="hover:text-text-primary transition-colors">Read Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-text-primary transition-colors">Contact Me</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-sm text-text-muted gap-4">
          <p>&copy; {new Date().getFullYear()} Sunil Karki. All rights reserved.</p>
          <p>Designed and built with precision.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
