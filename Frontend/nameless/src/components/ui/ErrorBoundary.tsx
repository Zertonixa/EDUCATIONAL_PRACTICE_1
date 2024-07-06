import React, { Component, ErrorInfo, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Flex 
                top = '0' 
                left = '0' 
                fontWeight = '700' 
                fontSize = '30px' 
                color = '#3572a5' 
                w = '100%' 
                h = '100vh' 
                bgColor = '#0d1117'>Всё поломалось...</Flex>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;