import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DollarSign } from "lucide-react";

const OverviewCard = ({
  icon,
  title,
  value,
  currency,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  currency?: boolean;
}) => {
  return (
    <Card className=" overview-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          +{currency ? formatCurrency(value.toString()) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
