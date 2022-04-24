export default function Button({
  children,
  className = "text-white bg-indigo-600 hover:bg-indigo-700",
  ...rest
}) {
  return (
    <span
      {...rest}
      className={`px-8 py-3 rounded-md border text-base font-medium ${className}`}
    >
      {children}
    </span>
  );
}
