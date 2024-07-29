import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import { FaTags } from "react-icons/fa6";

type Props = {};

const DiscountsList = (props: Props) => {
  const discounts = [
    { name: "10%", value: 10 },
    { name: "20%", value: 20 },
    { name: "30%", value: 30 },
    { name: "40%", value: 40 },
    { name: "50%", value: 50 },
    { name: "60%", value: 60 },
  ];
  return (
    <Card isBlurred>
      <CardHeader>
        <h1 className="text-2xl">Descuentos</h1>
      </CardHeader>
      <Divider />

      <CardBody>
        <div className="gap-4 flex flex-col sm:flex-row justify-evenly flex-wrap lg:columns-4 p-4">
          {discounts.map((discount) => (
            <Button
              as={Link}
              href={"/search?discounts=" + discount.value}
              startContent={<FaTags />}
              variant="ghost"
              key={discount.value}
              color="secondary"
              size="lg"
              className="h-max"
            >
              <h1 className="text-2xl flex flex-col gap-0 leading-none pt-1 pb-2">
                <span className="text-sm">Desde</span> {discount.name}
              </h1>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default DiscountsList;
