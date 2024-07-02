import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";

interface SimpleCardProps {
  icon: React.ReactNode;
  subTitle: string;
  content: string;
  percent: number;
  isGrowing: boolean;
  comparisonTime: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  icon,
  subTitle,
  content,
  percent,
  isGrowing,
  comparisonTime,
}) => {
  return (
    <Card className="w-full">
      <CardBody className="flex justify-between py-3 items-center">
        <IconButton size="lg">{icon}</IconButton>
        <div className="flex flex-col items-end">
          <Typography variant="small">{subTitle}</Typography>
          <Typography variant="h3">{content}</Typography>
        </div>
      </CardBody>
      <hr />
      <CardFooter className="py-4 flex gap-2">
        <Typography variant="h6" color={isGrowing ? "green" : "red"}>
          {isGrowing ? "+" : "-"}
          {percent}%
        </Typography>
        <Typography variant="paragraph">than {comparisonTime}</Typography>
      </CardFooter>
    </Card>
  );
};

export default SimpleCard;
