import {
  InvalidRefreshTokenError,
  TokenSetNotPresentError,
} from "$lib/server/errors";
import { error } from "@sveltejs/kit";

export const handleAPIError = (err: unknown) => {
  console.error(err);
  if (
    err instanceof TokenSetNotPresentError ||
    err instanceof InvalidRefreshTokenError
  )
    error(401, { message: "Unauthorized" });
  error(500, { message: "Internal server error" });
};
