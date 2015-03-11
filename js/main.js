memoryAlloc = new Array(64);

$(function() {
	$("#assemble").click(function(){
		decimal = $("#assembly").val();
		binary = dec2Bin(decimal);
		$("#machine").val(binary);
	});
});

function getOpCode(str)
{
	str = str.toLower();
	switch (str)
	{
		case "load":
			return 001;
		case "store":
			return 010;
		case "add":
			return 011;
		case "sub":
			return 100;
		case "equal":
			return 101;
		case "jump":
			return 110;
		case "halt":
			return 111;
		default:
			return "error"
	}
}

function dec2Bin(dec)
{
	binstr = (dec >>> 0).toString(2);
	while(binstr.length < 6) {
		binstr = "0" + binstr;
	}
    return binstr;
}