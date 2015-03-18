function assemble(){
	assembly = document.getElementById("assembly").value; // gets the value of the textarea for the assembly code
	linesOfCode = assembly.split("\n"); // creates an array of each line of assembly
	machineCode = ""; 
	returnCode = [];
	$.each(linesOfCode, function(i, line){
		re = new RegExp(/\s+/); // regex for one or more spaces
		code = line.split(re); // split each line of code by the spaces to get each separate 'word'
		opCode = getOpCode(code[0]); // attempt to get the corresponding opcode for the first 'word'
		if (opCode === "error")
		{
			tarea = document.getElementById('assembly');
			selectTextareaLine(tarea, i + 1);
			alert("Invalid operation: " + code[0]);
			return false;
		}
		if (opCode === "111") // the rest of the output is 0s if you get HALT opcode
		{
			numberBit = "0";
			binary = "000000"
			returnCode.push(opCode + " " + numberBit + " " + binary);
			return false;
		}
		else
		{
			numberBit = getNumberBit(code[1]);
			number = code[1];
			maxOperand = 63
			if (numberBit == 1) // get the operand
			{
				number = code[1].substring(1);
			}
			if (number > maxOperand)
			{
				alert("Operand out of bounds, operand must be <= " + maxOperand);
				return false;
			}
			binary = dec2Bin(number); // convert to the operand to binary
		}
		returnCode.push(opCode + " " + numberBit + " " + binary); // add the string for this line of code to the array
	});
	machineCode = returnCode.join("\n"); // join the array into a single string separated by new lines
	document.getElementById("machine").value = machineCode; // add the machine to the appropriate textarea
}

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

function selectTextareaLine(tarea,lineNum) {
	lineNum--; // array starts at 0
	var lines = tarea.value.split("\n");

	// calculate start/end
	var startPos = 0, endPos = tarea.value.length;
	for(var x = 0; x < lines.length; x++) {
		if(x == lineNum) {
			break;
		}
		startPos += (lines[x].length+1);
	}

	var endPos = lines[lineNum].length+startPos;

	// do selection
	// Chrome / Firefox

	if(typeof(tarea.selectionStart) != "undefined") {
		tarea.focus();
		tarea.selectionStart = startPos;
		tarea.selectionEnd = endPos;
		return true;
	}

	// IE
	if (document.selection && document.selection.createRange) {
		tarea.focus();
		tarea.select();
		var range = document.selection.createRange();
		range.collapse(true);
		range.moveEnd("character", endPos);
		range.moveStart("character", startPos);
		range.select();
		return true;
	}

	return false;
}
