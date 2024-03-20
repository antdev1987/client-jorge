/* eslint-disable react/prop-types */
const ContainerSection = ({ title, children, titleInside, className = 'mb-10' }) => (
  <section className={className}>
    {!titleInside && (
      <h2 className=" bg-gray-300 uppercase font-bold text-2xl px-3 py-1 w-fit rounded-xl">
        {title}
      </h2>
    )}

    <div className="border-2 border-gray-400 bg-gray-50 rounded-xl mt-4">
      {titleInside && (
        <h2 className="border-2 border-gray-400 bg-gray-300 uppercase font-bold text-2xl px-3 py-1 w-fit rounded-xl">
          {title}
        </h2>
      )}
      <div className="px-10 py-5">{children}</div>
    </div>
  </section>
);

export default ContainerSection;
