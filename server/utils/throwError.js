export default function throwError(err) {
  const err = new Error({ message: err?.message, status: err?.status });
  throw err;
}
