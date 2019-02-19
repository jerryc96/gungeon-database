create database Gungeon;
use Gungeon;
create table guns (
  itemid varchar(128),
  Name varchar(255),
  Description text,
  Pathname varchar(255),
  Quote varchar(255),
  primary key (itemid)
);

create table Admin (
    AdminID int,
    Username varchar(255),
    Pw varchar(255),
	salt varchar(16),
    Primary Key (AdminID)
);

insert into guns (itemid, Name, Description, Pathname, Quote) values
("A0001","Rusty Sidearm","The Rusty Sidearm was brought to the Gungeon by the Hunter.  Despite its extremely dated design and some signs of rust, this gun appears relatively new. Very strange... ","Rusty_Sidearm.png","Still Works. Mostly."),
("A0002","Marine Sidearm","The Marine Sidearm was brought to the Gungeon by a low-ranking Primerdyne soldier.  Though this gun appears sturdy, it has been known to fail when it is most needed. ","Marine_Sidearm.png","Always With You"),
("A0003","Rogue Special","The Rogue Special, given to the Pilot by his partner. It's never let him down.  This hip shooter has been known to fire half-cocked and often gets itself into more trouble than it can handle. ","Rogue_Special.png","Underhanded And Efficient"),
("A0004","Budget Revolver","This Budget Revolver was brought to the Gungeon by an infamous fugitive.  Provided by the Hegemony Regional Magistrate. The Convict won their plea to face the Gungeon in lieu of life imprisonment; undo their crimes, or face an eternity in Gungeon. With no cost to the state, it was an acceptable arrangement.  Cheaply made and prone to jams, the Budget Revolver used by only the most desperate Gungeoneers. ","Budget_Revolver.png","Affordable Arms"),
("A0005","Dart Gun","Just because children are young, doesn't mean they don't have pasts they would like to change. Perhaps some young soul wished to make sure his or her sibling took the blame for spilling grape juice on the couch. Much less worthy causes have been championed in the Gungeon. ","Dart_Gun.png","Sticky"),
("A0006","Robot’s Right Hand","The right hand of an assault robot that fled to the Gungeon.  It is a simple projectile delivery system. Reliable, but it's short barrel is lacking in intricacy. Under the control of a targeting AI it becomes fearsome indeed. ","Robot's_Right_Hand.png","Built To Kill"),
("A0007","Blasphemy","Betrayer!","Blasphemy.png","To The Point"),
("A0008","Casey","A standard baseball bat, modified to hit bullets instead of balls. Launches enemy projectiles back with a vengeance!  Nothing can happen until you swing the bat. ","Casey.png","Batting .50");
