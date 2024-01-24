import { forwardRef } from "react";

const ComponentToPrint = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      <p>Hello</p>
    </div>
  );
});

export default ComponentToPrint;
