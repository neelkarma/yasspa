import {
  Text,
  Center,
  VStack,
  Heading,
  Button,
  AlertIcon,
  Alert,
  Link,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
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
        <Head>
          <title>Client Error | YASSPA</title>
        </Head>
        <VStack spacing={5}>
          <Heading size="2xl">Client Error | YASSPA</Heading>
          <Alert status="warning" textAlign="center" maxW="max-content">
            <AlertIcon />
            <strong>
              If you&apos;re a graduated student, staff member or teacher,
              YASSPA will not work for you. Sorry.
            </strong>
          </Alert>
          <Text textAlign="center">
            For now, click the &quot;Try Again&quot; button below. If the error
            persists,{" "}
            <Link
              color="blue.400"
              href="https://www.github.com/neelkarma/yasspa/issues/new"
            >
              report it
            </Link>
            , and remember to include the stack trace.
          </Text>
          <HStack gap={1}>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(error.stack ?? String(error));
                this.setState({ copied: true });
              }}
            >
              {copied ? "Copied!" : "Copy Stack Trace"}
            </Button>
          </HStack>
        </VStack>
      </Center>
    );
  }
}
