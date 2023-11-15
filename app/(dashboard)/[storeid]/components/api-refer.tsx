import { ApiProps } from "@/app/types";
import Api from "@/app/ui/api-com";

type Props = {
  name: string;
  data: ApiProps[];
};

const ApiReference = ({ name, data }: Props) => {
  return (
    <div>
      <div className="my-3">
        <h6 className="font-bold text-2xl">API</h6>
        <p>API calls for {name}</p>
      </div>
      <div className="space-y-3">
        {data.map((api) => {
          return (
            <Api
              key={api.name}
              access={api.access}
              name={api.name}
              route={api.route}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApiReference;
