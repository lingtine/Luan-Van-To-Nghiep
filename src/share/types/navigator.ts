export interface INavigator {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: INavigator[];
}
