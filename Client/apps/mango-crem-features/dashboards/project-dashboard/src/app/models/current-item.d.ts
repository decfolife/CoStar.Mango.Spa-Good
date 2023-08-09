export interface CurrentItem {
  Id: string;
  Text: string;
  Href: string;
  Children?: CurrentItem[];
}
