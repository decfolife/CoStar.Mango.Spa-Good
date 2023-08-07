export class DashboardHero {
  title: string;
  hero : string;
  sidekick : string;
  subtitle : string;
  helpText : string;
  visible : boolean;

  constructor(
    title: string,
    hero: string,
    sidekick: string,
    subtitle?: string,
    helpText?: string,
    visible?: boolean
  ) {
		this.title = title;
		this.hero = hero;
		this.sidekick = sidekick;
		this.subtitle = subtitle;
		this.helpText = helpText;
		this.visible = visible;
	}

}