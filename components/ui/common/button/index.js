export default function Button({
  children,
  className,
  variant = "purple",
  hoverable = true,
  ...rest
}) {
  const variants = {
    purple: `text-white bg-indigo-600  ${hoverable && "hover:bg-indigo-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    //prettier-ignore
    lightPurple: `text-white-indigo-700 bg-indigo-100  ${hoverable && "hover:bg-indigo-200"}`,
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-md border text-base font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
