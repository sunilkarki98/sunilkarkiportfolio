"use client";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-full flex items-center justify-center bg-transparent border border-white/10 rounded-xl p-4">
          <p className="text-secondary text-sm text-center">
            Unable to load 3D content.<br/>
            Please try refreshing.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
