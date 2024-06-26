interface Props {
  minimum: string;
  recommended: string;
}

const SystemRequirements = ({ minimum, recommended }: Props) => {
  return (
    <>
      <p className="font-poppins text-lg my-6 text-gray-400 lg:px-0 px-3">
        System Requirements
      </p>
      <div className="lg:grid lg:grid-cols-2 bg-zinc-950 rounded lg:p-14 lg:gap-5 mb-10 px-3 py-10">
        <div>
          {minimum.split("\n").map((line, index) => (
            <p className="font-poppins text-gray-300" key={index}>
              {line}
            </p>
          ))}
        </div>
        <div className="lg:mt-0 mt-5">
          {recommended.split("\n").map((line, index) => (
            <p className="font-poppins text-gray-300" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SystemRequirements;
