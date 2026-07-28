import "../index.css";

export const metadata = {
  title: "Sunil Karki | AI & Full Stack Developer",
  description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot developement, n8n low-code workflows, and Full Stack web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
