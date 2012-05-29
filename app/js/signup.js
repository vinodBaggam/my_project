$(document).ready(function(){
	
	var cgs = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg')];
	var tfs = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];	
	
// signup form & validation methods //	
	
	$('#signupForm').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return true; //validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/print';
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				cgs[1].addClass('error');
				displayErrors(['That email address is already in use.']);
			}	else if (e.responseText == 'username-taken'){
				cgs[2].addClass('error');				
				displayErrors(['That username is already in use.']);				
			}
		}
	});
	
	function validateForm()
	{
		var e = [];
		for (var i=0; i < cgs.length; i++) cgs[i].removeClass('error');
		if (validateString(tfs[0].val()) == false) {
			cgs[0].addClass('error'); e.push('Please Enter Your Name');
		}
		if (validateEmail(tfs[1].val()) == false) {
			cgs[1].addClass('error'); e.push('Please Enter A Valid Email');
		}
		if (validateString(tfs[2].val()) == false) {
			cgs[2].addClass('error'); 			
			e.push('Please Choose A Username');
		}
		if (validatePassword(tfs[3].val()) == false) {
			cgs[3].addClass('error'); 
			e.push('Password Should Be At Least 6 Characters');
		}
		if (e.length) displayErrors(e);
		return e.length === 0;
	}
	
	function validateEmail(e)
	{
   		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(e);
	}
	
	function validateString(s)
	{
		return s.length >= 3;
	}
	
	function validatePassword(s)
	{
		return s.length >= 6;
	}
	
	function displayErrors(a)
	{
		$('#signupErrors .modal-body p').text('Please correct the following problems :');
		var ul = $('#signupErrors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		$('#signupErrors').modal('show');
	}	
	
// display errors in a modal window //	
	
	$('#signupErrors').modal({
		show : false,
		keyboard : true,
		backdrop : true
	});
	
})