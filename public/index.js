'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];



function dateToDays(d1,d2)
{
	 var date1 = new Date(d1);
	 var date2 = new Date(d2);
	 
	 return  1+(date2-date1)/86400000;
}




function calculateamounts(rentals , cars)
{
var priceday = 0;
var pricekm = 0 ;
for (var i = 0 ; i<  rentals.length ; i++)
{

for (var j = 0 ; j < cars.length ; j++){
    
	if(cars[j].id == rentals[i].carId)
{
priceday = cars[i].pricePerDay;
pricekm = cars[i].pricePerKm;

}

}
var time = dateToDays(rentals[i].pickupDate, rentals[i].returnDate );

    if((time < 4 )&&(time>1))
   {
priceday  = 0.9 * priceday;

     }

    if((time < 10 ) &&(time>1))
   {
priceday  = 0.7 * priceday;

    }

     if(time > 10 )
{
priceday  = 0.5 * priceday;

}

rentals[i].price =  time * priceday + rentals[i].distance * pricekm;

var charge = 0 ;
charge = 0.3 * rentals[i].price ; 
rentals[i].commission.insurance =  charge/2 ; 
rentals[i].commission.assistance =  time;
rentals[i].commission.drivy =  charge -(rentals[i].commission.insurance + rentals[i].commission.assistance);

//exo4

if(rentals[i].options.deductibleReduction == true)
      {
rentals[i].price = rentals[i].price + 4*time;

      }

	  //pay the actors
	  for(var k= 0 ; k < actors.length ; k++)
	  {
	  if(actors[k].rentalId == rentals[i].id)
	     {
		 
		      for(var l= 0 ; l < actors[k].payment.length ; l++){
		 
		switch (actors[k].payment[l].who)  {
		
		case "driver":
    actors[k].payment[l].amount = actors[k].payment[l].amount + rentals[i].price;
        break;
		
		case "owner":
    
	if(rentals[i].options.deductibleReduction == true)
	{
	actors[k].payment[l].amount = actors[k].payment[l].amount + 0.7 * (rentals[i].price -4*time);
     
	}
		else{
		actors[k].payment[l].amount = actors[k].payment[l].amount + 0.7*(rentals[i].price);
		
		     }
		break;
		
		case "insurance":
    actors[k].payment[l].amount = actors[k].payment[l].amount + rentals[i].commission.insurance;
        break;
		
		case "assistance":
  actors[k].payment[l].amount = actors[k].payment[l].amount + rentals[i].commission.assistance;
        break;
		
		case "drivy":
		if(rentals[i].options.deductibleReduction == true)
	{
  actors[k].payment[l].amount = actors[k].payment[l].amount + rentals[i].commission.drivy + 4*time;
  
    }
        
		else
		{
		  actors[k].payment[l].amount = actors[k].payment[l].amount + rentals[i].commission.drivy ;
		}
		
		
		break;
		
		                                   }
		
		 
		 
		                                                         }
		 
		 }
	 
	  }
	  
}


}

function modifrentals(rentals , cars){

for(var i = 0 ; i< rentalModifications.length ; i++){

   for(var j = 0 ; j< rentals.length ; j++)           {

   if(rentalModifications[i].rentalId == rentals[j].id)
                                           {
			
										   for(var properties in rentalModifications[i])
										   {
										   rentals[j][properties] =  rentalModifications[i][properties];
										   
										   }
										   
										    }
										 
                                                }


                                             }

											 
}




var rentalchangement = confirm("Press ok to apply rentals changements ");
  if (rentalchangement == true) {
  modifrentals(rentals , cars);
	
   }

//modifrentals(rentals , cars);
calculateamounts(rentals , cars);
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);









