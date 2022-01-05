import { Text, Center, VStack, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { Component, ErrorInfo } from "react";

interface ErrorBoundaryState {
  error: Error | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    copied: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { error, copied: false };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    this.setState({ error });
  }

  render() {
    const { error, copied } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <Center minH="100vh" p={5}>
        <VStack spacing={5}>
          {/* TODO: Add logo here */}
          <Heading size="3xl">Ouch!</Heading>
          <Text fontSize="xl" textAlign="center" fontWeight="bold">
            Important: If you are you a graduated student, staff member or
            teacher, YASSPA will not work for you. I&apos;m sorry.
          </Text>
          <Text fontSize="xl" textAlign="center">
            Or if you&apos;re not: Looks like an error occurred. For now, try
            clicking the &quot;Try Again&quot; button below. If the error
            persists, then I&apos;d really appreciate it if you{" "}
            <Link href="https://www.github.com/neelkarma/yasspa/issues/new">
              reported it
            </Link>
            , including the stack trace which you can copy to your clipboard by
            clicking the &quot;Copy Stack Trace&quot; button below.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              navigator.clipboard.writeText(error.stack ?? String(error));
              this.setState({ copied: true });
            }}
          >
            {copied ? "Copied!" : "Copy Stack Trace"}
          </Button>
        </VStack>
      </Center>
    );
  }
}
