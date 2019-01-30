




/*
	Date & Time Functions
*/

//return true if it's a leapyear
leapYear = function (year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

//convert number into roman numerals
romanize = function (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


romanDay = function (iDate) {
	let romanDays = ["dies Solis", "dies Lunae", "dies Martis", "dies Mercurii", "dies Iovis", "dies Veneris", "dies Saturnis"];
	let todaysDay = romanDays[iDate.getDay()];
	return todaysDay;
}

//convert the date to roman version
romanDate = function (iDate) {

	let iDay = iDate.getDate();
	let iMonth = iDate.getMonth();
	let iYear = iDate.getFullYear();

	//iMonth is 1-12
	//iDay is 1-31

	let months = ["Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius", "Iulius", "Augustus", "September", "October", "November", "December", "Ianuarius"];
	let monthsAlt = ["Ianuarias", "Februarias", "Martias", "Apriles", "Maias", "Iunias", "Iulias", "Augustas", "Septembres", "Octobres", "Novembres", "Decembres", "Ianuarias"];
	let monthsFirsts = ["Ianuariae", "Februariae", "Martiae", "Apriles", "Maiae", "Iunias", "Iuliae", "Augustae", "Septembres", "Octobres", "Novembres", "Decembres", "Ianuariae"];

	let latinMonth = monthsAlt[iMonth];
	let latinNextMonth = monthsAlt[iMonth + 1];
	let latinMonthFirst = monthsFirsts[iMonth];
	
	let nonesDay = 5;
	let idesDay = 13;
	let finalDay = 31;

	 //Jan 1 - 5 13 31
	 //Feb 2 - 5 13 28/29
	 //Mar 3 - 7 15 31
	 //Apr 4 - 5 13 30
	 //May 5 - 7 15 31
	 //Jun 6 - 5 13 30
	 //Jul 7 - 7 15 31
	 //Aug 8 - 5 13 31
	 //Sep 9 - 5 13 30
	 //Oct 10- 7 15 31
	 //Nov 11- 5 13 30
	 //Dec 12- 5 13 31


//set the correct date for each significant day
	switch (iMonth) {
		case 3: case 5: case 7: case 10:
			nonesDay = 7;
			idesDay = 15;
		break;

		case 4: case 6: case 9: case 11:
			finalDay = 30;
		break;

		case 2:
			if (leapYear(iYear)) {finalDay = 29}
	 		else {finalDay = 28}
	 	break;	
	}

//set the correct name for each day of the month, then return it
	let latinDay = ""
	
	//first of the month
	    if (iDay == 1) {
            latinDay = "kalendae " + latinMonthFirst;
            return latinDay;
		}
	//after first, before nones
	    else if (iDay > 1 && iDay <= (nonesDay - 1)) {
	    	let daysBefore = nonesDay - iDay + 1;
            latinDay = "ante diem " + romanize(daysBefore) + " nonas " + latinMonth;
            return latinDay;
		}
		else if (iDay == nonesDay - 1) {
            latinDay = "pridie nonas " + latinMonth;
            return latinDay;
		}
	//nones
	 	else if (iDay == nonesDay) {
            latinDay = "nonae " + latinMonthFirst;
            return latinDay;
		 }
	//after nones, before ides
		else if (iDay > nonesDay && iDay < (idesDay - 1)) {
	    	let daysBefore = idesDay - iDay + 1;
            latinDay = "ante diem " + romanize(daysBefore) + " idus " + latinMonth;
            return latinDay;
		}
	    else if (iDay == idesDay - 1) {
            latinDay = "pridie idus " + latinMonth;
            return latinDay;
		}
	//ides
	  	else if (iDay == idesDay) {
            latinDay = "idus " + latinMonthFirst;
            return latinDay;
		 }
	//after ides, before final day
		else if (iDay > nonesDay && iDay < (finalDay)) {
	    	let daysBefore = finalDay - iDay + 2;
            latinDay = "ante diem " + romanize(daysBefore) + " kalendas " + latinNextMonth;
            return latinDay;
		}
	//final day of the month
		else if (iDay == finalDay) {
            latinDay = "pridie kalendas " + latinNextMonth;
            return latinDay;
        }
        else {
            return "error: iDay:" + iDay + ", nonesday:" + nonesDay + ", finalday:" + finalDay + ", latinnextmonth:" + latinNextMonth;
        }
		
}

 
romanFullDate = function (iDate) {
	let date = romanDate(iDate);
	let day = romanDay(iDate);
	let year = iDate.getFullYear();
	let romanYear = romanize(year);
	return day.toUpperCase() + ", " + date.toUpperCase() + ", " + romanYear.toUpperCase();
}

dateFromInput = function (iYear, iMonth, iDay) {
	let date = new Date(iYear, iMonth - 1, iDay, 12, 0);
	let output = romanFullDate(date);
	return output
}




