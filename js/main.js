$(function() {
	$("#assemble").click(function(){
		assembly = $("#assembly").val();
		linesOfCode = assembly.split("\n");
		machineCode = "";
		returnCode = [];
		linesOfCode.forEach(function(line){
			code = line.split(" ");
			opCode = getOpCode(code[0]);
			if (opCode === "error")
			{
				alert("Invalid operation")
			}
			if (opCode === "111")
			{
				numberBit = "0";
				binary = "000000"
			}
			else
			{
				numberBit = getNumberBit(code[1]);
				number = code[1];
				if (numberBit == 1)
				{
					number = code[1].substring(1);
				}
				if (number > 63)
				{
					alert("Operand out of bounds");
				}
				binary = dec2Bin(number);
			}
			returnCode.push(opCode + " " + numberBit + " " + binary);
		});
		machineCode = returnCode.join("\n");
		$("#machine").val(machineCode);
	});
});

function getNumberBit(code)
{
	result = code.contains("#") ? 1 : 0;
	return result;
}

function getOpCode(str)
{
	str = str.toLowerCase();
	switch (str)
	{
		case "load":
			return "001";
		case "store":
			return "010";
		case "add":
			return "011";
		case "sub":
			return "100";
		case "equal":
			return "101";
		case "jump":
			return "110";
		case "halt":
			return "111";
		default:
			return "error"
	}
}

function dec2Bin(dec, bits)
{
	binstr = (dec >>> 0).toString(2);
	while(binstr.length < 6) {
		binstr = "0" + binstr;
	}
    return binstr;
}