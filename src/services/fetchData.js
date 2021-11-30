export async function fetchData(callback) {
  let mounted = true;
  try {
    if (mounted) {
      callback();
    }
  } catch (err) {
    console.log(err);
  }
  return () => (mounted = false);
}
