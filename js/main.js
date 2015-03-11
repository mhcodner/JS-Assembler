$(function() {
	$("#assemble").click(function(){
		decimal = $("#assembly").val();
		binary = dec2Bin(decimal);
		$("#machine").val(binary);
	});
});

function dec2Bin(dec)
{
	binstr = (dec >>> 0).toString(2);
	while(binstr.length < 6) {
		binstr = "0" + binstr;
	}
    return binstr;
}