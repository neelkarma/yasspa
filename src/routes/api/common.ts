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
    throw error(401, { message: "Unauthorized" });
  throw error(500, { message: "Internal server error" });
};
