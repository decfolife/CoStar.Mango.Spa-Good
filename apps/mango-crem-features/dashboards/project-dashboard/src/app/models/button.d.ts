export interface Button {
  type: 'text' | 'primary' | 'secondary';
  text?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick: any;
}
