$(function() {
	$("#assemble").click(function(){
		assembly = $("#assembly").val(); // gets the value of the textarea for the assembly code
		linesOfCode = assembly.split("\n"); // creates an array of each line of assembly
		machineCode = ""; 
		returnCode = [];
		$.each(linesOfCode, function(i, line){
			re = new RegExp(/\s+/); // regex for one or more spaces
			code = line.split(re); // split each line of code by the spaces to get each separate 'word'
			opCode = getOpCode(code[0]); // attempt to get the corresponding opcode for the first 'word'
			alert(code[0] + "\n" + code[1] + "\n" + opCode + "\n" + getNumberBit(code[1]));
			if (opCode === "error")
			{
				alert("Invalid operation")
			}
			if (opCode === "111") // the rest of the output is 0s if you get HALT opcode
			{
				numberBit = "0";
				binary = "000000"
			}
			else
			{
				numberBit = getNumberBit(code[1]);
				number = code[1];
				if (numberBit == 1) // get the operand
				{
					number = code[1].substring(1);
				}
				if (number > 63)
				{
					alert("Operand out of bounds");
				}
				binary = dec2Bin(number); // convert to the operand to binary
			}
			returnCode.push(opCode + " " + numberBit + " " + binary); // add the string for this line of code to the array
		});
		machineCode = returnCode.join("\n"); // join the array into a single string separated by new lines
		$("#machine").val(machineCode); // add the machine to the appropriate textarea
	});
});

function getNumberBit(code)
{
	return (code.indexOf("#") > -1) ? 1 : 0;
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

function dec2Bin(dec)
{
	binstr = (dec >>> 0).toString(2); // convert decimal to binary
	while(binstr.length < 6) { // pad with 0s to make it 6 bits
		binstr = "0" + binstr;
	}
    return binstr;
}
