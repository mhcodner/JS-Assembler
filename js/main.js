$(function() {
	$("#assemble").click(function(){
		decimal = $("#assembly").val();
		binary = dec2Bin(decimal);
		$("#machine").val(binary);
	});
});

function dec2Bin(dec)
{
    return (dec >>> 0).toString(2);
}