'use strict';

module.exports = function (app) {
	var sw = require("swagger-node-express");	
	var swe = sw.errors;

	var findById = {
	  'spec': {
	    description : "Operations about pets",  
	    path : "/pet/{petId}",
	    method: "GET",
	    summary : "Find pet by ID",
	    notes : "Returns a pet based on ID",
	    //type : "Pet",
	    nickname : "getPetById",
	    produces : ["application/json"],
	    parameters : [sw.pathParam("petId", "ID of pet that needs to be fetched", "string")],
	    responseMessages : [swe.invalid('id'), swe.notFound('pet')]
	  },
	  'action': function (req,res) {
	    /*if (!req.params.petId) {
	      throw swe.invalid('id'); }
	    var id = parseInt(req.params.petId);
	    var pet = petData.getPetById(id);

	    if(pet) res.send(JSON.stringify(pet));
	    else throw swe.notFound('pet');*/
	   	res.send(JSON.stringify({a:1,b:2}));
	  }
	};
	sw.addGet(findById);
};