// Generated Android rule bodies run against local text fields and chart output.
String.prototype.equals = function(value) { return String(this) === String(value); };
Array.prototype.get = function(index) { return this[index]; };
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdaysMM = ["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"];
const questions = ["မေးခွန်းအမျိုးအစားရွေးပါ။             📝", "အရှုံး/အနိုင်", "အကြီး/အငယ်", "ယောကျ်ား/မိန်းမ", "ပစ္စည်းပျောက်", "ခရီးသွား လာ/မလာ", "သတင်းစကား မှန်/မမှန်", "လူနာသေ/မသေ"];
function fields(input) {
    const output = {};
    const initial = {
        ...input,
        dia: { setTitle: value => output.title = value, setMessage: value => output.reading = value },
        _matchesLokadhamTitle: key => (output.textview11 || "").replace(/\s|\u200B/g, "").includes(key),
        _loadLokadhamHtml: () => output.lokadham = initial.html,
        loadChartHtml: value => output.chart = value,
        captureAhta: value => output.ahta = value,
        switch1: { isChecked: () => input.previous, setChecked: () => {} },
        data1: questions,
        spinner1: { getSelectedItemPosition: () => input.question }
    };
    initial.dialog = initial.dia;
    const state = new Proxy(initial, {
        has(target, key) {
            return key !== Symbol.unscopables && (key in target || !(key in globalThis) && !String(key).startsWith("_"));
        },
        get(target, key) {
            if (key === Symbol.unscopables) return undefined;
            if (key in target) return target[key];
            return {
                setText: value => output[key] = String(value),
                getText: () => output[key] || ""
            };
        }
    });
    return {state, output};
}
// The Android comparisons leave :30 outside both adjacent periods.
function periodMinute(hour, minute) {
    return minute === 30 && [1, 4, 7, 10].includes(hour % 12) ? 31 : minute;
}
function msannAnga(weekday, hour, minute) {
    const {state, output} = fields({dayy: weekdays[weekday], currenthour: hour % 12 || 12, currentminute: periodMinute(hour, minute)});
    const rules = AnggaFragmentActivity(state);
    for (const method of ["_d1","_k1","_kk","_k2","_k3","_k4","_k5","_tt"]) rules[method]();
    return output;
}
function msannKala(weekday, hour, minute, previous, question) {
    const {state, output} = fields({dayy: weekdays[weekday], currenthour: hour % 12 || 12, currentminute: periodMinute(hour, minute), previous, question, html: ""});
    const rules = KalaaFragmentActivity(state);
    rules._aa1();
    rules._ans1();
    return output;
}
function msannSann(birth, reference, age, hour = 12, minute = 0, weekday = 0) {
    const {state, output} = fields({age, yea: birth[0], currentyear: reference[0], html: "", day: weekdays[weekday], currenthour: hour % 12 || 12, currentminute: periodMinute(hour, minute)});
    output.dayyy = String(birth[2]); output.monthhh = String(birth[1]);
    output.edittext4 = String(reference[2]); output.edittext5 = String(reference[1]);
    output.textview = weekdays[birth[3]];
    const rules = SannnFragmentActivity(state);
    rules._t1(); rules._calcu1(); rules._kaw();
    output.mmm = weekdaysMM[birth[3]];
    output.textview11 = output.a5;
    const readings = AaaActivity(state);
    readings._dasaname();
        readings._menu1();
    output.remainderReading = output.reading;
    const remainder = "၀၁၂၃၄၅၆".indexOf(output.aa);
    if (remainder >= 0) readings["_apha" + remainder]();
    output.natalReading = output.reading;
    output.textview182 = weekdays[birth[3]];
    output.textview193 = String(age);
    output.cc = output.ccc;
    ["ahtun","thike","raza","puti","adipiti","bin","marana"].forEach((key, i) => output["s" + (i + 1)] = output[key]);
    ["bin","marana","ahtun","thike","raza","puti","adipiti"].forEach((key, i) => output["abcdefg"[i] + "k"] = output[key]);
    readings._twt();
    readings._aa1();
    readings._sun();
    const natalColumns = ["cc", "dd", "ee", "ff", "gg", "aa", "bb"];
    const birthColumns = ["a", "b", "columnC", "d", "e", "f", "g"];
    natalColumns.forEach((key, i) => {
        output[birthColumns[i]] = output[key];
        output["n" + (i + 1)] = output[key];
        output["a" + (i + 1)] = output["s" + (i + 1)];
    });
    readings._sannkyin();
    readings._sannkyincolor();
    readings._pakka();
    readings._azitta();
    readings._sunaar();
    output.reading = "";
    readings._ai();
    output.vimalaReading = output.reading;
    output.reading = "";
    readings._menu2();
    output.threeTierReading = output.reading;
    readings._thet();
    return output;
}

function SannnFragmentActivity(state) {
    with (state) {
        function _t1() {
		if ((age % 8) == 1) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
		}
		else {
			_t2();
		}
	}
        function _t2() {
		if ((age % 8) == 2) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
		}
		else {
			_t3();
		}
	}
        function _t3() {
		if ((age % 8) == 3) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
		}
		else {
			_t4();
		}
	}
        function _t4() {
		if ((age % 8) == 4) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
		}
		else {
			_t5();
		}
	}
        function _t5() {
		if ((age % 8) == 5) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
		}
		else {
			_t6();
		}
	}
        function _t6() {
		if ((age % 8) == 6) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
		}
		else {
			_t7();
		}
	}
        function _t7() {
		if ((age % 8) == 7) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
		}
		else {
			_t8();
		}
	}
        function _t8() {
		if ((age % 8) == 0) {
			if (textview.getText().toString().equals("Sunday")) {
				a5.setText("သောကြာသက်ရောက်(သုခံလောကဓံ)");
			}
			if (textview.getText().toString().equals("Monday")) {
				a5.setText("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)");
			}
			if (textview.getText().toString().equals("Tuesday")) {
				a5.setText("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Wednesday")) {
				a5.setText("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Thursday")) {
				a5.setText("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)");
			}
			if (textview.getText().toString().equals("Friday")) {
				a5.setText("ရာဟုသက်ရောက်(ယသောလောကဓံ)");
			}
			if (textview.getText().toString().equals("Saturday")) {
				a5.setText("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)");
			}
		}
		else {
			
		}
	}
        function _calcu1() {
		if ((monthhh.getText().toString().equals("1") || (monthhh.getText().toString().equals("2") || (monthhh.getText().toString().equals("3") || (monthhh.getText().toString().equals("4") && (17 > Number(dayyy.getText().toString())))))) || (monthhh.getText().toString().equals("01") || (monthhh.getText().toString().equals("02") || (monthhh.getText().toString().equals("03") || (monthhh.getText().toString().equals("04") && (17 > Number(dayyy.getText().toString()))))))) {
			if (((yea - 639) % 7) == 1) {
				aa.setText("၁");
				bb.setText("၄");
				ccc.setText("၀");
				dd.setText("၃");
				ee.setText("၆");
				ff.setText("၂");
				gg.setText("၅");
			}
			else {
				if (((yea - 639) % 7) == 2) {
					aa.setText("၂");
					bb.setText("၅");
					ccc.setText("၁");
					dd.setText("၄");
					ee.setText("၀");
					ff.setText("၃");
					gg.setText("၆");
				}
				else {
					if (((yea - 639) % 7) == 3) {
						aa.setText("၃");
						bb.setText("၆");
						ccc.setText("၂");
						dd.setText("၅");
						ee.setText("၁");
						ff.setText("၄");
						gg.setText("၀");
					}
					else {
						if (((yea - 639) % 7) == 4) {
							aa.setText("၄");
							bb.setText("၀");
							ccc.setText("၃");
							dd.setText("၆");
							ee.setText("၂");
							ff.setText("၅");
							gg.setText("၁");
						}
						else {
							if (((yea - 639) % 7) == 5) {
								aa.setText("၅");
								bb.setText("၁");
								ccc.setText("၄");
								dd.setText("၀");
								ee.setText("၃");
								ff.setText("၆");
								gg.setText("၂");
							}
							else {
								if (((yea - 639) % 7) == 6) {
									aa.setText("၆");
									bb.setText("၂");
									ccc.setText("၅");
									dd.setText("၁");
									ee.setText("၄");
									ff.setText("၀");
									gg.setText("၃");
								}
								else {
									if (((yea - 639) % 7) == 0) {
										aa.setText("၀");
										bb.setText("၃");
										ccc.setText("၆");
										dd.setText("၂");
										ee.setText("၅");
										ff.setText("၁");
										gg.setText("၄");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			if (((yea - 638) % 7) == 1) {
				aa.setText("၁");
				bb.setText("၄");
				ccc.setText("၀");
				dd.setText("၃");
				ee.setText("၆");
				ff.setText("၂");
				gg.setText("၅");
			}
			else {
				if (((yea - 638) % 7) == 2) {
					aa.setText("၂");
					bb.setText("၅");
					ccc.setText("၁");
					dd.setText("၄");
					ee.setText("၀");
					ff.setText("၃");
					gg.setText("၆");
				}
				else {
					if (((yea - 638) % 7) == 3) {
						aa.setText("၃");
						bb.setText("၆");
						ccc.setText("၂");
						dd.setText("၅");
						ee.setText("၁");
						ff.setText("၄");
						gg.setText("၀");
					}
					else {
						if (((yea - 638) % 7) == 4) {
							aa.setText("၄");
							bb.setText("၀");
							ccc.setText("၃");
							dd.setText("၆");
							ee.setText("၂");
							ff.setText("၅");
							gg.setText("၁");
						}
						else {
							if (((yea - 638) % 7) == 5) {
								aa.setText("၅");
								bb.setText("၁");
								ccc.setText("၄");
								dd.setText("၀");
								ee.setText("၃");
								ff.setText("၆");
								gg.setText("၂");
							}
							else {
								if (((yea - 638) % 7) == 6) {
									aa.setText("၆");
									bb.setText("၂");
									ccc.setText("၅");
									dd.setText("၁");
									ee.setText("၄");
									ff.setText("၀");
									gg.setText("၃");
								}
								else {
									if (((yea - 638) % 7) == 0) {
										aa.setText("၀");
										bb.setText("၃");
										ccc.setText("၆");
										dd.setText("၂");
										ee.setText("၅");
										ff.setText("၁");
										gg.setText("၄");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
	}
        function _kaw() {
		if ((edittext5.getText().toString().equals("01") || (edittext5.getText().toString().equals("02") || (edittext5.getText().toString().equals("03") || (edittext5.getText().toString().equals("04") && (17 > Number(edittext4.getText().toString())))))) || (edittext5.getText().toString().equals("1") || (edittext5.getText().toString().equals("2") || (edittext5.getText().toString().equals("3") || (edittext5.getText().toString().equals("4") && (17 > Number(edittext4.getText().toString()))))))) {
			if (((currentyear - 639) % 7) == 1) {
				bin.setText("၁");
				marana.setText("၄");
				ahtun.setText("၀");
				thike.setText("၃");
				raza.setText("၆");
				puti.setText("၂");
				adipiti.setText("၅");
			}
			else {
				if (((currentyear - 639) % 7) == 2) {
					bin.setText("၂");
					marana.setText("၅");
					ahtun.setText("၁");
					thike.setText("၄");
					raza.setText("၀");
					puti.setText("၃");
					adipiti.setText("၆");
				}
				else {
					if (((currentyear - 639) % 7) == 3) {
						bin.setText("၃");
						marana.setText("၆");
						ahtun.setText("၂");
						thike.setText("၅");
						raza.setText("၁");
						puti.setText("၄");
						adipiti.setText("၀");
					}
					else {
						if (((currentyear - 639) % 7) == 4) {
							bin.setText("၄");
							marana.setText("၀");
							ahtun.setText("၃");
							thike.setText("၆");
							raza.setText("၂");
							puti.setText("၅");
							adipiti.setText("၁");
						}
						else {
							if (((currentyear - 639) % 7) == 5) {
								bin.setText("၅");
								marana.setText("၁");
								ahtun.setText("၄");
								thike.setText("၀");
								raza.setText("၃");
								puti.setText("၆");
								adipiti.setText("၂");
							}
							else {
								if (((currentyear - 639) % 7) == 6) {
									bin.setText("၆");
									marana.setText("၂");
									ahtun.setText("၅");
									thike.setText("၁");
									raza.setText("၄");
									puti.setText("၀");
									adipiti.setText("၃");
								}
								else {
									if (((currentyear - 639) % 7) == 0) {
										bin.setText("၀");
										marana.setText("၃");
										ahtun.setText("၆");
										thike.setText("၂");
										raza.setText("၅");
										puti.setText("၁");
										adipiti.setText("၄");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			if (((currentyear - 638) % 7) == 1) {
				bin.setText("၁");
				marana.setText("၄");
				ahtun.setText("၀");
				thike.setText("၃");
				raza.setText("၆");
				puti.setText("၂");
				adipiti.setText("၅");
			}
			else {
				if (((currentyear - 638) % 7) == 2) {
					bin.setText("၂");
					marana.setText("၅");
					ahtun.setText("၁");
					thike.setText("၄");
					raza.setText("၀");
					puti.setText("၃");
					adipiti.setText("၆");
				}
				else {
					if (((currentyear - 638) % 7) == 3) {
						bin.setText("၃");
						marana.setText("၆");
						ahtun.setText("၂");
						thike.setText("၅");
						raza.setText("၁");
						puti.setText("၄");
						adipiti.setText("၀");
					}
					else {
						if (((currentyear - 638) % 7) == 4) {
							bin.setText("၄");
							marana.setText("၀");
							ahtun.setText("၃");
							thike.setText("၆");
							raza.setText("၂");
							puti.setText("၅");
							adipiti.setText("၁");
						}
						else {
							if (((currentyear - 638) % 7) == 5) {
								bin.setText("၅");
								marana.setText("၁");
								ahtun.setText("၄");
								thike.setText("၀");
								raza.setText("၃");
								puti.setText("၆");
								adipiti.setText("၂");
							}
							else {
								if (((currentyear - 638) % 7) == 6) {
									bin.setText("၆");
									marana.setText("၂");
									ahtun.setText("၅");
									thike.setText("၁");
									raza.setText("၄");
									puti.setText("၀");
									adipiti.setText("၃");
								}
								else {
									if (((currentyear - 638) % 7) == 0) {
										bin.setText("၀");
										marana.setText("၃");
										ahtun.setText("၆");
										thike.setText("၂");
										raza.setText("၅");
										puti.setText("၁");
										adipiti.setText("၄");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
	}
        return {_t1,_t2,_t3,_t4,_t5,_t6,_t7,_t8,_calcu1,_kaw};
    }
}
function AnggaFragmentActivity(state) {
    with (state) {
        function _d1() {
		if ((currenthour == 12) || ((currenthour == 1) && (30 > currentminute))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("သောကြာအခါ။");
			}
		}
		else {
			_d2();
		}
	}
        function _d2() {
		if (((currenthour > 6) || (currenthour == 6)) && ((7 > currenthour) || ((currenthour == 7) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("စနေအခါ။");
			}
		}
		else {
			_d3();
		}
	}
        function _d3() {
		if (((currenthour > 1) || ((currenthour == 1) && (currentminute > 30))) && ((3 > currenthour) || ((currenthour == 3) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
		}
		else {
			_d4();
		}
	}
        function _d4() {
		if (((currenthour > 3) || (currenthour == 3)) && ((4 > currenthour) || ((currenthour == 4) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
		}
		else {
			_d5();
		}
	}
        function _d5() {
		if (((currenthour > 4) || ((currenthour == 4) && (currentminute > 30))) && ((6 > currenthour) || ((currenthour == 6) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("စနေအခါ။");
			}
		}
		else {
			_d6();
		}
	}
        function _d6() {
		if (((currenthour > 7) || ((currenthour == 7) && (currentminute > 30))) && ((9 > currenthour) || ((currenthour == 9) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
		}
		else {
			_d7();
		}
	}
        function _d7() {
		if (((currenthour > 9) || (currenthour == 9)) && ((10 > currenthour) || ((currenthour == 10) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
		}
		else {
			_d8();
		}
	}
        function _d8() {
		if (((currenthour > 10) || ((currenthour == 10) && (currentminute > 30))) && ((12 > currenthour) || ((currenthour == 12) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				textview90.setText("တနင်္လာအခါ။");
			}
			if (dayy.equals("Monday")) {
				textview90.setText("အင်္ဂါအခါ။");
			}
			if (dayy.equals("Tuesday")) {
				textview90.setText("ဗုဒ္ဓဟူးအခါ။");
			}
			if (dayy.equals("Wednesday")) {
				textview90.setText("ကြာသပတေးအခါ။");
			}
			if (dayy.equals("Thursday")) {
				textview90.setText("သောကြာအခါ။");
			}
			if (dayy.equals("Friday")) {
				textview90.setText("စနေအခါ။");
			}
			if (dayy.equals("Saturday")) {
				textview90.setText("တနင်္ဂနွေအခါ။");
			}
		}
		else {
			
		}
	}
        function _k1() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			a.setText("၁");
			b.setText("၄");
			cc.setText("၀");
			d.setText("၃");
			e.setText("၆");
			f.setText("၂");
			g.setText("၅");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				a.setText("၂");
				b.setText("၅");
				cc.setText("၁");
				d.setText("၄");
				e.setText("၀");
				f.setText("၃");
				g.setText("၆");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					a.setText("၃");
					b.setText("၆");
					cc.setText("၂");
					d.setText("၅");
					e.setText("၁");
					f.setText("၄");
					g.setText("၀");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						a.setText("၄");
						b.setText("၀");
						cc.setText("၃");
						d.setText("၆");
						e.setText("၂");
						f.setText("၅");
						g.setText("၁");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							a.setText("၅");
							b.setText("၁");
							cc.setText("၄");
							d.setText("၀");
							e.setText("၃");
							f.setText("၆");
							g.setText("၂");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								a.setText("၆");
								b.setText("၂");
								cc.setText("၅");
								d.setText("၁");
								e.setText("၄");
								f.setText("၀");
								g.setText("၃");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									a.setText("၀");
									b.setText("၃");
									cc.setText("၆");
									d.setText("၂");
									e.setText("၅");
									f.setText("၁");
									g.setText("၄");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _kk() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			a1.setText("၁");
			a2.setText("၄");
			a3.setText("၀");
			a4.setText("၃");
			a5.setText("၆");
			a6.setText("၂");
			a7.setText("၅");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				a1.setText("၂");
				a2.setText("၅");
				a3.setText("၁");
				a4.setText("၄");
				a5.setText("၀");
				a6.setText("၃");
				a7.setText("၆");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					a1.setText("၃");
					a2.setText("၆");
					a3.setText("၂");
					a4.setText("၅");
					a5.setText("၁");
					a6.setText("၄");
					a7.setText("၀");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						a1.setText("၄");
						a2.setText("၀");
						a3.setText("၃");
						a4.setText("၆");
						a5.setText("၂");
						a6.setText("၅");
						a7.setText("၁");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							a1.setText("၅");
							a2.setText("၁");
							a3.setText("၄");
							a4.setText("၀");
							a5.setText("၃");
							a6.setText("၆");
							a7.setText("၂");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								a1.setText("၆");
								a2.setText("၂");
								a3.setText("၅");
								a4.setText("၁");
								a5.setText("၄");
								a6.setText("၀");
								a7.setText("၃");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									a1.setText("၀");
									a2.setText("၃");
									a3.setText("၆");
									a4.setText("၂");
									a5.setText("၅");
									a6.setText("၁");
									a7.setText("၄");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _k2() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			aa.setText("၀");
			bb.setText("၃");
			ccc.setText("၆");
			dd.setText("၂");
			ee.setText("၅");
			ff.setText("၁");
			gg.setText("၄");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				aa.setText("၅");
				bb.setText("၁");
				ccc.setText("၄");
				dd.setText("၀");
				ee.setText("၃");
				ff.setText("၆");
				gg.setText("၂");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					aa.setText("၄");
					bb.setText("၀");
					ccc.setText("၃");
					dd.setText("၆");
					ee.setText("၂");
					ff.setText("၅");
					gg.setText("၁");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						aa.setText("၆");
						bb.setText("၂");
						ccc.setText("၅");
						dd.setText("၁");
						ee.setText("၄");
						ff.setText("၀");
						gg.setText("၃");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							aa.setText("၂");
							bb.setText("၅");
							ccc.setText("၁");
							dd.setText("၄");
							ee.setText("၀");
							ff.setText("၃");
							gg.setText("၆");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								aa.setText("၄");
								bb.setText("၀");
								ccc.setText("၃");
								dd.setText("၆");
								ee.setText("၂");
								ff.setText("၅");
								gg.setText("၁");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									aa.setText("၁");
									bb.setText("၄");
									ccc.setText("၀");
									dd.setText("၃");
									ee.setText("၆");
									ff.setText("၂");
									gg.setText("၅");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _k3() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			aaa.setText("၅");
			bbb.setText("၁");
			cccc.setText("၄");
			ddd.setText("၀");
			eee.setText("၃");
			fff.setText("၆");
			ggg.setText("၂");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				aaa.setText("၄");
				bbb.setText("၀");
				cccc.setText("၃");
				ddd.setText("၆");
				eee.setText("၂");
				fff.setText("၅");
				ggg.setText("၁");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					aaa.setText("၆");
					bbb.setText("၂");
					cccc.setText("၅");
					ddd.setText("၁");
					eee.setText("၄");
					fff.setText("၀");
					ggg.setText("၃");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						aaa.setText("၂");
						bbb.setText("၅");
						cccc.setText("၁");
						ddd.setText("၄");
						eee.setText("၀");
						fff.setText("၃");
						ggg.setText("၆");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							aaa.setText("၁");
							bbb.setText("၄");
							cccc.setText("၀");
							ddd.setText("၃");
							eee.setText("၆");
							fff.setText("၂");
							ggg.setText("၅");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								aaa.setText("၃");
								bbb.setText("၆");
								cccc.setText("၂");
								ddd.setText("၅");
								eee.setText("၁");
								fff.setText("၄");
								ggg.setText("၀");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									aaa.setText("၄");
									bbb.setText("၀");
									cccc.setText("၃");
									ddd.setText("၆");
									eee.setText("၂");
									fff.setText("၅");
									ggg.setText("၁");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _k4() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			aa1.setText("၄");
			aa2.setText("၀");
			aa3.setText("၃");
			aa4.setText("၆");
			aa5.setText("၂");
			aa6.setText("၅");
			aa7.setText("၁");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				aa1.setText("၁");
				aa2.setText("၄");
				aa3.setText("၀");
				aa4.setText("၃");
				aa5.setText("၆");
				aa6.setText("၂");
				aa7.setText("၅");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					aa1.setText("၀");
					aa2.setText("၃");
					aa3.setText("၆");
					aa4.setText("၂");
					aa5.setText("၅");
					aa6.setText("၁");
					aa7.setText("၄");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						aa1.setText("၃");
						aa2.setText("၆");
						aa3.setText("၂");
						aa4.setText("၅");
						aa5.setText("၁");
						aa6.setText("၄");
						aa7.setText("၀");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							aa1.setText("၄");
							aa2.setText("၀");
							aa3.setText("၃");
							aa4.setText("၆");
							aa5.setText("၂");
							aa6.setText("၅");
							aa7.setText("၁");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								aa1.setText("၂");
								aa2.setText("၅");
								aa3.setText("၁");
								aa4.setText("၄");
								aa5.setText("၀");
								aa6.setText("၃");
								aa7.setText("၆");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									aa1.setText("၅");
									aa2.setText("၁");
									aa3.setText("၄");
									aa4.setText("၀");
									aa5.setText("၃");
									aa6.setText("၆");
									aa7.setText("၂");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _k5() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			s1.setText("၂");
			s2.setText("၅");
			s3.setText("၁");
			s4.setText("၄");
			s5.setText("၀");
			s6.setText("၃");
			s7.setText("၆");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				s1.setText("၆");
				s2.setText("၂");
				s3.setText("၅");
				s4.setText("၁");
				s5.setText("၄");
				s6.setText("၀");
				s7.setText("၃");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					s1.setText("၄");
					s2.setText("၀");
					s3.setText("၃");
					s4.setText("၆");
					s5.setText("၂");
					s6.setText("၅");
					s7.setText("၁");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						s1.setText("၅");
						s2.setText("၁");
						s3.setText("၄");
						s4.setText("၀");
						s5.setText("၃");
						s6.setText("၆");
						s7.setText("၂");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							s1.setText("၀");
							s2.setText("၃");
							s3.setText("၆");
							s4.setText("၂");
							s5.setText("၅");
							s6.setText("၁");
							s7.setText("၄");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								s1.setText("၄");
								s2.setText("၀");
								s3.setText("၃");
								s4.setText("၆");
								s5.setText("၂");
								s6.setText("၅");
								s7.setText("၁");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									s1.setText("၃");
									s2.setText("၆");
									s3.setText("၂");
									s4.setText("၅");
									s5.setText("၁");
									s6.setText("၄");
									s7.setText("၀");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _tt() {
		if (textview90.getText().toString().equals("တနင်္ဂနွေအခါ။")) {
			b1.setText("၀");
			b2.setText("၃");
			b3.setText("၆");
			b4.setText("၂");
			b5.setText("၅");
			b6.setText("၁");
			b7.setText("၄");
		}
		else {
			if (textview90.getText().toString().equals("တနင်္လာအခါ။")) {
				b1.setText("၅");
				b2.setText("၁");
				b3.setText("၄");
				b4.setText("၀");
				b5.setText("၃");
				b6.setText("၆");
				b7.setText("၂");
			}
			else {
				if (textview90.getText().toString().equals("အင်္ဂါအခါ။")) {
					b1.setText("၄");
					b2.setText("၀");
					b3.setText("၃");
					b4.setText("၆");
					b5.setText("၂");
					b6.setText("၅");
					b7.setText("၁");
				}
				else {
					if (textview90.getText().toString().equals("ဗုဒ္ဓဟူးအခါ။")) {
						b1.setText("၆");
						b2.setText("၂");
						b3.setText("၅");
						b4.setText("၁");
						b5.setText("၄");
						b6.setText("၀");
						b7.setText("၃");
					}
					else {
						if (textview90.getText().toString().equals("ကြာသပတေးအခါ။")) {
							b1.setText("၂");
							b2.setText("၅");
							b3.setText("၁");
							b4.setText("၄");
							b5.setText("၀");
							b6.setText("၃");
							b7.setText("၆");
						}
						else {
							if (textview90.getText().toString().equals("သောကြာအခါ။")) {
								b1.setText("၄");
								b2.setText("၀");
								b3.setText("၃");
								b4.setText("၆");
								b5.setText("၂");
								b6.setText("၅");
								b7.setText("၁");
							}
							else {
								if (textview90.getText().toString().equals("စနေအခါ။")) {
									b1.setText("၁");
									b2.setText("၄");
									b3.setText("၀");
									b4.setText("၃");
									b5.setText("၆");
									b6.setText("၂");
									b7.setText("၅");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        return {_d1,_d2,_d3,_d4,_d5,_d6,_d7,_d8,_k1,_kk,_k2,_k3,_k4,_k5,_tt};
    }
}
function KalaaFragmentActivity(state) {
    with (state) {
        function _aa1() {
		if ((currenthour == 12) || ((currenthour == 1) && (30 > currentminute))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th><font color=\"red\">လ</font></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆&nbsp;&nbsp;<font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈<font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(ပဉ္စမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa2();
		}
	}
        function _aa2() {
		if (((currenthour > 1) || ((currenthour == 1) && (currentminute > 30))) && ((3 > currenthour) || ((currenthour == 3) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th><font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th><font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(ဆဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa3();
		}
	}
        function _aa3() {
		if (((currenthour > 3) || (currenthour == 3)) && ((4 > currenthour) || ((currenthour == 4) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th><font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th><font color=\"red\">လ</font>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄&nbsp;&nbsp;<font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(သတ္တမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa4();
		}
	}
        function _aa4() {
		if (((currenthour > 4) || ((currenthour == 4) && (currentminute > 30))) && ((6 > currenthour) || ((currenthour == 6) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font>၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font>၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th><font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th><font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(အဋ္ဌမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa5();
		}
	}
        function _aa5() {
		if (((currenthour > 6) || (currenthour == 6)) && ((7 > currenthour) || ((currenthour == 7) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font>၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font>၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂<font color=\"red\">လ</font></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂<font color=\"red\">လ</font></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;၁<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;၁<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(ပထမအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa6();
		}
	}
        function _aa6() {
		if (((currenthour > 7) || ((currenthour == 7) && (currentminute > 30))) && ((9 > currenthour) || ((currenthour == 9) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;&nbsp;<font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th><font color=\"red\">လ</font></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th><font color=\"red\">လ</font></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(ဒုတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa7();
		}
	}
        function _aa7() {
		if (((currenthour > 9) || (currenthour == 9)) && ((10 > currenthour) || ((currenthour == 10) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th><font color=\"red\">လ</font></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th><font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(တတိယအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			_aa8();
		}
	}
        function _aa8() {
		if (((currenthour > 10) || ((currenthour == 10) && (currentminute > 30))) && ((12 > currenthour) || ((currenthour == 12) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၆</span>\n        <span class=\"bottom\">၁&nbsp;&nbsp;၂</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\">၈&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၃</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၄&nbsp;&nbsp;၅</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္ဂနွေနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;၆<font color=\"red\">လ</font>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅&nbsp;&nbsp;၆\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၄</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၁&nbsp;&nbsp;၂</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၈&nbsp;&nbsp;<font color=\"red\">လ</font></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၃</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">တနင်္လာနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"><font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၅&nbsp;&nbsp;၆</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၄</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၀&nbsp;&nbsp;၁</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၈<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">အင်္ဂါနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈</span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၄\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၅</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၁</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၈&nbsp;&nbsp;<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂&nbsp;&nbsp;၃</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ဗုဒ္ဓဟူးနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th><font color=\"red\">လ</font></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၅</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၂&nbsp;&nbsp;၈<font color=\"red\">လ</font></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၆&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၁</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">ကြာသပတေးနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"><font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>၅\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th>၆</th>\n    <th></th>\n    <th></th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\">၂</span>\n      </div>\n    </th>\n    <th></th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၃&nbsp;&nbsp;၄</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">သောကြာနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅<font color=\"red\">လ</font></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;&nbsp;၀</span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေည(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
				else {
					switch1.setChecked(false);
					html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Diagonal Line in Table</title>\n<style>\n  table {\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 2px solid black;\n    position: relative;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n  }\n  .diagonal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .diagonal1:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n  .diagonal2:before {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(-26.7deg);\n    transform-origin: 0 0;\n    width: 111.5%;\n  }\n \n  .diagonal1 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(80%, 0%);\n  }\n  .diagonal1 span.bottom {\n    top: 100%;\n    transform: translate(10%, -90%);\n  }\n    .diagonal2 span {\n    position: absolute;\n    width: 50%;\n    top: 0;\n    left: 0;\n    transform: translate(10%, 10%);\n  }\n  .diagonal2 span.bottom {\n    top: 100%;\n    transform: translate(70%, -90%);\n  }\n</style>\n</head>\n<body>\n\n<table align=\"center\">\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\">၁</span>\n        <span class=\"bottom\">၆</span>\n      </div>\n    </th>\n    <th>\n    </th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\">၄&nbsp;&nbsp;၅</span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n    <th></th>\n    <th></th>\n    <th>၃</th>\n  </tr>\n  <tr>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal2\">\n        <span class=\"top\">၈&nbsp;၀<font color=\"red\">လ</font></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n    <th>  ၂</th>\n    <th style=\"position: relative;\">\n      <div class=\"diagonal diagonal1\">\n        <span class=\"top\"></span>\n        <span class=\"bottom\"></span>\n      </div>\n    </th>\n  </tr>\n  <tr>\n      <th colspan=\"3\">စနေနေ့(စတုတ္ထအခါ)</th>\n  </tr>\n</table>\n\n</body>\n</html>";
					
					loadChartHtml(html);
				}
			}
		}
		else {
			
		}
	}
        function _ans1() {
		if ((currenthour == 12) || ((currenthour == 1) && (30 > currentminute))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans2();
		}
	}
        function _ans2() {
		if (((currenthour > 1) || ((currenthour == 1) && (currentminute > 30))) && ((3 > currenthour) || ((currenthour == 3) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans3();
		}
	}
        function _ans3() {
		if (((currenthour > 3) || (currenthour == 3)) && ((4 > currenthour) || ((currenthour == 4) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans4();
		}
	}
        function _ans4() {
		if (((currenthour > 4) || ((currenthour == 4) && (currentminute > 30))) && ((6 > currenthour) || ((currenthour == 6) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans5();
		}
	}
        function _ans5() {
		if (((currenthour > 6) || (currenthour == 6)) && ((7 > currenthour) || ((currenthour == 7) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans6();
		}
	}
        function _ans6() {
		if (((currenthour > 7) || ((currenthour == 7) && (currentminute > 30))) && ((9 > currenthour) || ((currenthour == 9) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans7();
		}
	}
        function _ans7() {
		if (((currenthour > 9) || (currenthour == 9)) && ((10 > currenthour) || ((currenthour == 10) && (30 > currentminute)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_ans8();
		}
	}
        function _ans8() {
		if (((currenthour > 10) || ((currenthour == 10) && (currentminute > 30))) && ((12 > currenthour) || ((currenthour == 12) && (currentminute == 00)))) {
			if (dayy.equals("Sunday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Monday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Tuesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Wednesday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("ရှုံးမယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အငယ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("နပုန်းပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးမရှိတော့ပါဘူး။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာဖို့မရှိသေးပါဘူး။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မမှန်ပါဘူး။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("မသေပါဘူး။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Thursday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("သရေကျပါလိမ့်မယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အကြီးပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("ယောကျ်ား။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("တစ်ဝက်လောက်ကျန်ပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လမ်းခုလတ်မှာကြန့်ကြာနေပါတယ်။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("တစ်ဝက်မှန်၊တစ်ဝက်မှားနေပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("နာတာရှည်ဖြစ်တတ်ပါတယ်။");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Friday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (dayy.equals("Saturday")) {
				if (switch1.isChecked()) {
					switch1.setChecked(true);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					switch1.setChecked(false);
					if (data1.get((spinner1.getSelectedItemPosition())).equals("အရှုံး/အနိုင်")) {
						textview2.setText("အနိုင်ရဖို့သေချာပါတယ်။");
					}
					else {
						if (data1.get((spinner1.getSelectedItemPosition())).equals("အကြီး/အငယ်")) {
							textview2.setText("အလတ်ပါ။");
						}
						else {
							if (data1.get((spinner1.getSelectedItemPosition())).equals("ယောကျ်ား/မိန်းမ")) {
								textview2.setText("မိန်းမပါ။");
							}
							else {
								if (data1.get((spinner1.getSelectedItemPosition())).equals("ပစ္စည်းပျောက်")) {
									textview2.setText("ပစ္စည်းအားလုံးရှိပါသေးတယ်။");
								}
								else {
									if (data1.get((spinner1.getSelectedItemPosition())).equals("ခရီးသွား လာ/မလာ")) {
										textview2.setText("လာနေပါပြီ။");
									}
									else {
										if (data1.get((spinner1.getSelectedItemPosition())).equals("သတင်းစကား မှန်/မမှန်")) {
											textview2.setText("မှန်ပါတယ်။");
										}
										else {
											if (data1.get((spinner1.getSelectedItemPosition())).equals("လူနာသေ/မသေ")) {
												textview2.setText("သေ💔");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			
		}
	}
        return {_aa1,_aa2,_aa3,_aa4,_aa5,_aa6,_aa7,_aa8,_ans1,_ans2,_ans3,_ans4,_ans5,_ans6,_ans7,_ans8};
    }
}
function AaaActivity(state) {
    with (state) {
        function _apha0() {
		if (mmm.getText().toString().equals("စနေ")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("အင်္ဂါ")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("သောကြာ")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("တနင်္လာ")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("ကြာသပတေး")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha1() {
		if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("စနေ")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("သောကြာ")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("တနင်္လာ")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("ကြာသပတေး")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha2() {
		if (mmm.getText().toString().equals("တနင်္လာ")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("ကြာသပတေး")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("စနေ")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("အင်္ဂါ")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha3() {
		if (mmm.getText().toString().equals("အင်္ဂါ")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("သောကြာ")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("ကြာသပတေး")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("စနေ")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha4() {
		if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("စနေ")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("အင်္ဂါ")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("သောကြာ")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("တနင်္လာ")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha5() {
		if (mmm.getText().toString().equals("ကြာသပတေး")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("စနေ")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("အင်္ဂါ")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("သောကြာ")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("တနင်္လာ")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _apha6() {
		if (mmm.getText().toString().equals("သောကြာ")) {
			dia.setTitle("သင်ဟာ ဘင်္ဂဖွားဖြစ်တဲ့အတွက်");
			dia.setMessage("သင်ဟာ စေတနာကောင်း၊စိတ်ရင်းကောင်းသူပါပဲ။ ဇွဲလုံ့လဝီရိယနဲ့ပြည့်စုံပြီး ထက်သန်တဲ့စိတ် ၊ပြင်းပြသောဆန္ဒ၊ ကြိုးစား ချင်သောစိတ်တွေရှိကြတယ်။ မဆုတ်မနစ်သော ဇွဲက လမ်းကြောင်းမှန်ပါက အောင်မြင်မှုပန်းတိုင်ကိုရောက်မည်။ ဆုံးဖြတ်ချက်ချပြီးရင် သိကြားမင်းဆင်း၍ဖျက်တာတောင်မရပေ။ မိမိဆုံးဖြတ်ချက်သည် မှားနေရင်မှ လမ်းဆုံးရောက်အောင်လျှောက်တတ်သည်။ နောင်တတရားကလဲ မိမိသန္တာန်မှာ ခဏသာခိုဝင်တတ်သည်။နောင်တရလည်း ခဏပင် ။အမှတ်သည်းခြေမရှိ ။ခေါင်းမာသည်။ တယူသန်သည်။\n\n\nပြောစရာရှိလျှင် လုပ်စရာရှိလျှင် ဘွင်းဘွင်းရှင်းရှင်းအားမနာတမ်းပြောတတ်ခြင်းကြောင့် လူမုန်းများတတ်သည်။ မိမိသည် စကားပြောမတတ်ခြင်းကြောင့်\n\nပေါင်းသင်းဆက်ဆံရေးညံ့သည်ဟုထင်ကြသည်။ မဟုတ်ပါ။ အတွင်းစိတ်ရင်းအရမ်းကောင်းသူဆိုတာမိမိနဲ့ ရေရှည်ပေါင်းသင်းသူသာသိသည်။ သူဘာပြောပြော စေတနာဒေါသနဲ့ ပြောသည်ဆိုတာနားလည်လာကြသည်။\n\nဒါကြောင့်ပဲ မိမိကိုယ်ခင်မိသူတွေက မိမိကိုယ် မိတ်ဆွေအဖြစ်ကနေ လက်လွတ်မခံချင်ကြပါ။ မိမိနဲ့ခင်မင်ဖူးသူတွေက မိမိအကြောင်းတသသပြောနေတတ်ကြသည်။ မိမိသည် တစိမ်းတရံတွေကိုခင်မိပြီဆိုရင် ဆွေမျိုးထက်ပိုခင်တတ်သည်။ ဒါကြောင့်ပဲမိမိကအခြားသူတွေကို မိမိလိုစိတ်ဖြူ သည်ထင်၍ အတွင်းရေးကိစ္စတွေ ပြောပြတိုင်ပင်အကြံဉာဏ်တောင်းမိသည်။ ထိုသို့ပြုမူခြင်းသည် အကျိုးမရှိသည့်အပြင် မိမိလျှို့ဝှက်ချက်ကို သိသွား၍မိမိအပေါ် အထင်မြင်သေး ဟားတိုက်စရာဖြစ်လိမ့်မည်။\n\n\nဘင်္ဂဖွားများဟာ ကိုယ့်ဒူးကိုယ်ချွန်ကြို းစာလိုစိတ်ရှိကြတယ်။ ဘယ်သူ့ကိုယ်မှ မမှီခိုလိုဘူး။ သူတစ်ပါးရဲ့လောင်းရိပ်မိနေတာမျိုးကိုလဲမလိုလားကြပါဘူး။ သူများကို အားကိုးလို့လဲ မရပါဘူး။ ဘယ်အလုပ်ကိစ္စမဆိုလဲ မိမိက ဦးဆောင်ဦးရွက်လုပ်ရမှလဲကျေနပ်ကြတယ်။ စီးပွားရေး ဘယ်လိုလုပ်မယ်။ ငွေကိုဘယ်လိုရှာလိုက်မယ်လို့ စိတ်ထဲတွေးနေတတ်ပေမဲ့အပြင်ပန်း လက်တွေ့မှာတော့ရသမျှနှင့်တင်းတမ်ရောင်ရဲတတ်သူပါ။\n\n\nအမှန်တရားကိုမြတ်နိုးတတ်သူ၊တန်ဖိုးထားတတ်သူဖြစ်ပြီး ဘယ်အလုပ်ကိုပဲလုပ်လုပ် စေတနာပါပါနဲ့လုပ်တတ်သူပါပဲ။ စေတနာကောင်းရင် ကံကောင်းတယ်လို့ ခံယူထားသူပါ။\n\nလူအများက မိမိကို အထင်ကြီးလေးစားပေမဲ့ မိမိက သူတစ်ပါးအထင်ကြီးအောင် ဟိတ်ဟန်မထုတ်တတ်ပါ။ ပတ်ဝန်းကျင်ကို ဂရုမစိုက်တတ်ပေမဲ့ ပတ်ဝန်ကျင်းမှာ အခက်အခဲတခုခုဖြစ်ရင်တော့ စိတ်ပါလက်ပါ ကူညီတတ်သူပါပဲ။ မိမိကအငြင်းသန်ပါတယ်။ မှန်တယ်ထင်ရင်တော့ ငြင်းလို့ဆုံးမည်မဟုတ်ပေ။ ဖော်လံဖားမလုပ်တတ်ခြင်း ၊ မိမိကြိုးစားမှုကို ဂုဏ်ဖော်၍မပြောတတ်ခြင်းတွေကြောင့် မိမိဟာ အသိအမှတ်ပြုမခံရခြင်း ချောင်ထိုးခံရခြင်းတွေ ခဏခဏကြုံရတတ်ပါတယ်။\n\n\nဘင်္ဂဖွားတွေဟာ မည်သူ့ကိုမဆိုအဆင့်အတန်းခွဲခြားပြီးဆက်ဆံလေ့မရှိပါဘူး။ သူဌေးနဲ့ ဆက်ဆံလဲဒီအတိုင်းဆိုရင် ဆင်းရဲသားနဲ့ဆက်ဆံလဲ ဒီအတိုင်းပါပဲ။ ဘာမှပြောင်းလဲခြင်းမရှိဘဲ အားလုံးကိုတစ်သားထဲဆက်ဆံတတ်တယ်။\n\n\nအခွင့်ထူးခံရဖို့ မျက်နှာသာပေးခံရဖို့ဆိုတဲ့စိတ်နဲ့ အလုပ်မလုပ်တတ်ပါ။ ပေးအပ်တဲ့တာဝန်နဲ့ ဝတ္တရားကို ကျေပွန်လိုတဲ့စိတ်နဲ့သာ လုပ်တတ်သူပါ။ငယ်ရွယ်စဉ်ကာလ အဘက်ဘက်ကကံအားနည်းတယ်။ ခြူခြာလွယ်တယ်။မိမိကို မွေးပြီးတော့ မိဘတွေလုပ်ငန်းစီးပွားတိုးတတ်နိုင်သလို အကုန် အကျတွေလဲ အလွန်များတတ်ပါတယ်။ ပထမအရွယ်အတတ်အကျမြန်တတ်ပါတယ်။");
			
			
		}
		else {
			if (mmm.getText().toString().equals("တနင်္လာ")) {
				dia.setTitle("သင်ဟာ မရဏဖွားဖြစ်တဲ့အတွက်");
				dia.setMessage("မရဏဖွားတွေရဲ့စိတ်ကကြောက်စရာကောင်းသည်။ အမြဲတမ်း အစွန်းနှစ်ဖက်ရောက်နေတတ်တတ်သည်။အချို့နေရာတွေမှာ ခြေသုတ်ပုဆိုးမြွေဆွယ်ကျိုးလို သည်းခံတတ်ပေမဲ့ ရက်စက်ပြီဆိုရင်လဲ သူများလိုက်မမှီအောင် ရက်စက်တတ်သူပါ။ မြွေပွေးတစ်ကောင်နှင့်အလားသဏ္ဍာန်တူသည်။ မထိသ၍ဘာမှရန်မပြုပေမဲ့ ထိမိလိုက်ရင်တော့ အန္တရာယ်အလွန်ရှိတတ်ကြသည်။ ထက်မြက်တယ်။ စိတ်ဓာတ်ပြင်းထန်ကြတယ်။ သမာသမတ်ကျတယ်။ အမှန်တရားကိုမြတ်နိုးသည်။ ရှေ့နေရှေ့ရပ်ကိစ္စ၊ ကြားဝင်ညှိနှိုင်းဆောင်ရွက်ရာမှာ ထူးချွန်တတ်သည်။\n\nဆွေးမျိုးထက် တစိမ်းကပိုအကျိုးပေးသည်။ ဆွေမျိုးတွေ ဒုက္ခပေးတတ်သည်။ တစိမ်းတရံကြားမှာအခြေချနေထိုင်ရတတ်သလို ဇာတိရဲ့အဝေးမှာ ထွန်းပေါက်အောင်မြင်တတ်တယ်။ တစ်ခါ တရံဇွတ်တရွတ်လုပ်တတ်တာမျိုးရှောင်ပါ။ ကိုယ်ကအလုပ်အပေါ် သေချာဂရုစိုက်လုပ်ရင်တောင် သူများတွေက ပေါ့တယ် ဂရုမစိုက်ဘူး အလုပ်အပေါ်အလေးမထားဘူးလို့အပြောခံရတတ်တာမျိုးပါ။ မိမိကလဲ အလုပ်တစ်ခုကိုအစပိုင်းမှာစိတ်ပါဝင်စားတတ်သော်လည်း နောက်ပိုင်း မှာ ပျင်းရိသွားတတ်သူပါ။ကောက်ရိုးမီးလိုပါပဲ။ အစကတော့ ဟုန်းခနဲပေါ့။ နောက်ပိုင်းတော့ မီးစပင်ရှာလို့မရတတ်ဘူး။\nအဲဒါကြောင့်ပဲ အလုပ်ခဏ ခဏပြောင်းမိနေတတ်တယ်။\n\nမရဏဖွားတွေလဲ နှစ်ရှည်လုပ်ရတဲ့အလုပ် ၊ ကြာရှည်လုပ်ကိုင်ရတဲ့အလုပ်မျိုးတွေနဲ့ မသင့်လျော်ဘူး။\nဥပမာ ပေးရရင် နှစ်ရှည်ပင်စိုက်ပျိုးခြင်း၊ ဥယျာဉ်ခြံ ၊ Hotel လုပ်ငန်းမျိုးတွေပေါ့။ အခုလုပ်အခုအကျိုးအမြတ်ရတဲ့ ပေါ်ပင်အလုပ်မျိုးတွေနဲ့ပဲသင့်လျော်ပါတယ်။ မိမိကစိတ်မြန်လက်မြန်ရှိပြီး မြန်မြန်သွက်သွက် နဲ့ လက်တွေ့ကျကျလုပ်ရသောအလုပ်တွေကို သဘောတွေ့တတ်ကြပါတယ်။ မရဏဖွားတွေ လောကဓံကို ကြံ့ကြံ့ခံ ရင်ဆိုင်နိုင်သူပါ။ ဒုက္ခလောကဓံကိုခါးစည်းခံနိုင်သလို သုခလောကဓံကိုလဲ ခံနိုင်သူပါ။ \"ငရဲဆိုတာ ငါ့အတွက်တော့ ချွေးထုတ်ခန်း ဝင်သလောက်ပါပဲ\"လို့ ပြောမဲ့သူတွေပါ။\nမရဏဖွားတွေက အပြင်ပန်းကကြည့်ရင်တော့ လျှင်မြန်တယ် ဉာဏ်ပြေးတယ် သွက်လတ်တယ်လို့ ထင်ရပေမဲ့ လက်တွေ့မှာတော့ ကိစ္စတစ်ခုကို ဆုံးဖြတ်ချက်ချရာမှာ ချိတုံချတုံအလွန်ဖြစ်တတ်ပါတယ်။\nငါလုပ်လိုက်တာမှားသွားလားဆိုပြီး စိုးရိမ်စိတ်ကလေး အမြဲဝင်တတ်ပါတယ်။အားနည်းချက်က အလွန်မေ့တတ်တာပါ။ ပြောထားပြီး မေ့နေပြန်ရော။ အသက်ကြီးလာရင် အလွန်မေ့တတ်ကြတယ်။\nသူတစ်ပါးအလုပ်ပင်ဖြစ်ပါစေ စေတနာပါပါနဲ့လုပ်ကိုင်ပေးတတ်သူပါပဲ။မိမိကိုယ် အားကိုးပြီးခိုင်းရင် အားကိုးသလောက်ပြန် လုပ်ပေးတတ်တယ်။ စကားကြီးစကားကျယ်ပြောတာ\nအမှန်အတိုင်းသာပြောတတ်တာ တွေက လူမုန်းများသွားတတ်ပါတယ်။ ဘဝတည်ငြိမ်မှုအားနည်းတယ်။ လှိုင်းတပိုးတွေလို ဘဝကအတတ်အကျများတယ်။ အပယိကရောဂါလေး\nတွေ ခဏခဏဖြစ်လွယ်တယ်။ ငယ်ဇာတာမကောင်းပါ။ ပင်ပန်းရတတ်တယ်။ စိတ်ဆင်းရဲကိုယ်ဆင်းရဲဖြစ်လွယ်တယ် ။ အိုဇာတာကတော့ ပထမတန်းစားကောင်းသူပါ။ မရဏဖွားတွေဟာ မိမိအပူသောကတွေကို သူများတွေကို လက်ဆင့်မကမ်းတတ်သူပါ။ ဒုက္ခတွေကို တစ်ယောက်ထဲခါးစည်းခံမဲ့သူတွေပါ။ ရောဂါဖြစ်ရင်တောင် အိမ်သားတွေမပြောဘဲ တစ်ယောက်ထဲကြိတ်ခံ တတ်တာမျိုးပါ။\n\nဘဝကိုအရှုံးမပေးတတ်သူတွေပါပဲ။ ဘယ်လိုအခက်အခဲကြုံကြုံရင်ဆိုင်သွားတတ်သူပါ။ ကံကြမ္မာကလဲ အခွင့်အရေးကောင်းတွေ မကြာခဏပေးတတ်ပါတယ်။ မိမိကဖမ်းဆုပ်တတ်ဖို့ပဲလို\nပါတယ်။ ကိုယ့်ကိုယ်ကို ဖျက် သံချေးတတ် ဆိုတာမျိုးမဖြစ်အောင် ဂရုစိုက်ပါ။ ကံက အတိုက်အခံတွေ့လေအောင်မြင်လေပါပဲ။ မင်္ဂလာတရားတော်ထဲက 'အတ္တသမ္မာ ပဏိဓိ စ\" ဆိုတဲ့ မင်္ဂလာတရားတော်နဲ့အညီ မိမိကိုယ်ကိုစောင့်ထိန်းနိုင်မယ်ဆိုရင်တော့ အောင်မြင်မှုဆိုတာကို မလွဲမသွေ ခံစားရမှာပါ......။ ။");
				
				
			}
			else {
				if (mmm.getText().toString().equals("ကြာသပတေး")) {
					dia.setTitle("သင်ဟာ အထွန်းဖွားဖြစ်တဲ့အတွက်");
					dia.setMessage("ဖွားဇာတာတွေထဲမှာ အထွန်းဖွားတွေက အလွန်ပဲ တည်ကြည်တဲ့သူတွေပါ။ ကိုယ်ကျင့်သိက္ခာကျစေမဲ့ ကိစ္စ ၊ လူများလက်ညှိုးထိုးမဲ့ ကိစ္စမျိုး တတ်နိုင်သ၍ရှောင်ကြ သူတွေပါပဲ။ အစိုးရဝန်ထမ်းပဲလုပ်လုပ် ၊အပြင်အလုပ်တွေပဲလုပ်လုပ် သူများအလုပ်တိုင်းကို မိမိအလုပ်လိုသဘောထားပြီး လုပ်ပေးတတ်သူပါ။ မိမိကိုယ်ကျင့်သိက္ခာကို ထိပါးပြောဆိုလာမယ်ဆိုရင်လဲ အချိန်မဆိုင်းဘဲ ဖြေရှင်းတတ်သူပါ၊\nအလွန်ပဲစေ့စပ်သေချာတဲ့သူတွေပါ။ စနစ်ကောင်းတယ်။ အလုပ်ကိုတန်ဖိုးထားမြတ်နိုးတယ်။အလုပ်နဲ့လက်နဲ့ပြတ် နေရင် မနေတတ်ဘဲ တစ်ခုခုရှာပြီးလုပ်နေတတ်သူပါ။\nလုပ်စရာမရှိရင် ပျင်းနေတတ်ပြီး တစ်ခုခုလုပ်နေရမှာ ကျေနပ်နေသူတွေပါ။ မည်သည့်အလုပ်ကိုမဆို လွယ်လွယ်နဲ့ လက်မလျော့တတ်ဘဲ ဖြစ်မြောက်အောင် လုပ်တတ်သူပါ။ အလုပ်ကံကောင်းတတ်ကြတယ်။\nမည်သည်အလုပ်ကို မဆို ရေရှည်ဇောက်ချပြီး လုပ်ပါကထွန်းပေါက်ပါလိမ့်မယ်။ လက်ရှိဘဝနဲ့ မတင်းတိမ်ဘဲ အမြဲတမ်း ဘဝတက်လမ်းကို ရှာနေတတ်တဲ့ အတွက် ဖြည်းဖြည်းချင်းအောင်မြင်မှုတွေ\nရလာမှာပါ။ မည်သည့် ပညာရပ်ကိုမဆို သိလွယ်တတ်လွယ်သူတွေပါ။ မိဘတွေကသာ ပညာရေးကို ထောက်ပံ့ပေးနိုင်မယ်ဆို အလွန်ထူးချွန်ပါ လိမ့်မယ်။စိတ်ရှည်ကြတယ်။ အပင်ပန်းလဲ ခံနိုင်ကြတယ်။\nဘာလုပ်လုပ် ဂရုတစိုက်ရှိတယ်။ လုပ်သလောက်အကျိုးဖြစ်ထွန်းပင်ပေမဲ့ အောင်မြင်မှုအသီးအပွင့်တွေ အခွင့်အရေးတွေကို အခြား\nလူတွေကရသွားကြတာများပါတယ်။ မိမိကအခွင့်အရေးကို ဂရုမစိုက်ပါ။ တာဝန်ကျေပွန်ရင်ကျေနပ်နေတတ်သူပါ။ လုပ်ချင်တာလုပ်ရရင် ပျော်နေတတ်သူပါ။\n\nသူများအကျိုးစီးပွားကိုတောင်မှ အကူအညီတောင်းရင်မငြင်းတတ်သူပါ။ စိတ်ကောင်း စေတနာကောင်းသည်၊ရိုးသားတယ်။ ဒါပေမဲ့ ပွင့်ပွင့်လင်းလင်းပြောတတ်ကြတယ်။ အပြစ်လုပ်ထားရင်လဲ အားမနာတမ်းပြောတတ်ကြပါတယ်။ ပြောပြီးရင်လဲ မေ့မေ့ပျောက်ပျောက်နဲ့ နေတတ်သူ တွေပါ။ ရန်ညှိုးမထားတတ်ဘူး။ မိမိကအေးဆေးတည်ငြိမ်စွာနေတတ်တဲ့ အတွက် လူအများက ဘဝင်မြင့်တယ်။ မာနကြီးတယ်လို့ထင်တတ်ကြပါတယ်။ကိုယ်ကလဲ ခင်မင်သူများနဲ့ သာလိုက်ရောညီထွေ နေတတ်ပြီး မခင်မင်သူတွေနဲ့ကတော့ ခပ်ကင်းကင်း\nနေတတ်ပါတယ်။\nဒါပေမဲ့မိမိကံက အပေါင်းအသင်းကံညံ့ပါတယ်။ မိမိကစေတနာနဲ့ပြောဆိုရင်တောင် မိတ်ဆွေတွေကအကောင်းမထင်တတ်ပါ။ မိမိကပဲ အနစ်နာခံပေါင်းသင်းနေရတတ်ပါတယ်။ မိမိက ကကျွေးလဲကျွေးရ အဆဲလဲခံရမဲ့ဇာတာပါ။ မိမိကလဲအဖော်ခင်တယ်။ အပေါင်းအသင်းမက်တယ်။ အပျော်အပါး ပွဲလမ်းသဘင် ဝါသနာထုံတယ်။ ခရီးထွက်ရတာ ဝါသနာပါတယ်။\n\nမိမိဇာတာက သားသမီးအကျိုးပေးကံအားနည်းတယ်၊အနည်းဆုံး မိဘကို ဒုက္ခပေးမဲ့ စုန်းပြူးတစ်ယောက်လောက်တော့ပါလာတတ်တယ်။ ကိုယ်ကလဲ သားသမီးတွေ ဘာလုပ်လုပ်မျက်စိစပါးမွှေးစူးနေတတ်တယ်။ ဘာပဲလုပ်လုပ် အစမှာတော့ မိမိကအလွန်ပဲစိုးရိမ်တတ်ကြတယ်။ တကယ်လုပ်ကြည့်တဲ့အခါ မိမိအတွက်အခက်အခဲမရှိအဆင်ပြေသွားတတ်ပါတယ်။ ဇွတ်လုပ်တတ်ပြီး ဝီရိယရှိတဲ့အတွက် အောင်မြင်မှုလမ်းပေါ်ရောက်ပါလိမ့်မယ်။");
					
					
				}
				else {
					if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
						dia.setTitle("သင်ဟာ သိုက်ဖွားဖြစ်တဲ့အတွက်");
						dia.setMessage("စိတ်ကူးတွေနဲ့ ဖန်တီးလို့မရ၊ အမြဲတမ်းလက်တွေ့ကျကျပဲအဆင်ပြေမည်။ စိတ်ကူးစိတ်သန်းတွေနဲ့ ရေရှည်ရည်မှန်းပြီးလုပ်သမျှ အဆင်ပြေဖို့မလွယ်။ ဘဝကိုလက်တွေကျကျ အကောင်အထည်ဖော်နိုင်မှရမည်။ အလုပ်ကိုလဲ အပင်ပန်းခံပြီးလုပ်ရမဲ့ ဇာတာပေါ့။ သူများတွေ တစ်နှစ်ထဲကြိုးစားပြီးအောင်မြင်တဲ့အလုပ်ကို ကိုယ်က သုံးနှစ်လောက်ကြိုးစားရမည်။ အလုပ်နှင့် လက်နဲ့မပြတ် လုပ်တတ်ပေမဲ့ မကြာခဏ ကြွေးတင်နေတတ် သည်။ လက်ထဲငွေပြတ်နေတယ်။ မိမိကစည်းကမ်းရှိသည်။ ငွေကိုစနစ်တကျသုံး တတ်သော်လည်း မိသားစုကြောင့် ကျန်းမာရေးကြောင့် ငွေသုံးရတတ်သည်။\n\nမိမိကိုယ်တိုင်ကလဲ အလုပ်မရှိရင်မနေတတ်။ တစ်ခုခုအမြဲလုပ်နေတတ်သည်။ လုပ်သလောက် အလုပ်အကျိုးမခံစားရတတ်ပေ။ အလုပ်ကံညံ့သည်။ နှစ်ပေါင်းများစွာလုပ်ပြီး ရာထူးမတိုးတာ လစာမတိုးတာမျိုးကြုံရတတ်တယ်။ ဘယ်လောက်လုပ်လုပ်အကောင်းပြောမခံရတတ်။ မကြာခဏ စေတနာဝန်ထမ်း လုပ်နေရမည်။ အိတ်စိုက်လုပ်ရမည်။\nတာဝန်ကျေပွန်အောင်လုပ်ပေးပေမဲ့ နောက်ကွယ်မှာ\nအပြစ်ပြောခြင်းခံရမည်၊\n\nမိမိကစိတ်ကောင်းရှိသည်။ သည်းခံစိတ်ရှိသည်။ လူအများကိုလဲ ခင်တွယ်စိတ်ရှိတယ်။ မိမိက ဘာမဟုတ်တဲ့ကိစ္စလေးတွေနဲ့ စိတ်ဆိုးနေတတ်သည်။ ကလေးတစ်ယောက်လို စိတ်ကောက်လိုက် စိတ်ပြေလိုက် မကြာခဏဖြစ်တတ်သည်။ မိမိသည် အပေါင်းအသင်းများသည်။ ဒါပေမဲ့ ရေရှည်လက်မတွဲတတ်။ အပေါင်းအသင်းသစ်တွေနဲ့ လဲ အမြဲတွေ့နေတတ်တဲ့အဖွားတွေပါပဲ။ အပျိုကြီး လူပျိုကြီးတွေလဲ ဖြစ်လွယ်ကြတယ်။ မိမိသည် လူအပင်ပန်းခံနိုင်ပေမဲ့ စိတ်အပင်ပန်းမခံနိုင်ကြပါ။ ဒါပေမဲ့ကံကလဲ စိတ်ပင်ပန်းအမြဲခံရမည်။ တစ်ယောက်ထဲဆို အားငယ်နေတတ်သည်။ ဝမ်းနည်းနေတတ်သည်။ မိမိကိုယ်ကို အားမလိုအားမရဖြစ်နေတတ်သည်။ အလုပ်တစ်ခု ကိုယ်လဲမိမိဆုံးဖြတ်ချက်ဖြင့်မဆုံးဖြတ်နိုင်ပါ။အမြဲသူများဆီက အကြံဉာဏ်တောင်းနေရတတ်သည်။\n\nမိမိက ပေါင်းသင်းဆက်ဆံရေးကောင်းပါတယ်။ ခင်မင်အောင်နေတတ်တယ်။ မိမိက တစ်ပါးသူကို အထင်ကြီးပြီး အယုံလွယ်တတ်တဲ့ အတွက်အလိမ်ခံရတတ်တယ်။မိမိကစိတ်အပြောင်းအလဲမြန်တယ်။ တစ်ခုမပြီးသေးခင်နောက်အသစ်တစ်ခုလုပ်တတ် တယ်။ မိမိကကံကိုယ်ယုံကြည်သည်။ ကောင်းတာလုပ်ရင် ကောင်းတာဖြစ်မယ်လို့\nခံယူထားသည်။ စိတ်ရှည်ပြီး မည်သည့်အလုပ်ကိုယ်မဆို သေသပ်စွာ လုပ်တတ်သည်။ မိမိကလဲ အများအထင်ကြီး အောင်လဲနေတတ်ကြသည်။\n\nနှုတ်မှုရေးရာ ၊ အနုပညာ အလုပ်တွေ နဲ့အောင်မြင်တတ်သည်။ သိပ်မရင်းနှီးတဲ့သူဆို မိမိက စကားနည်းတဲ့သူလိုထင်ရပေမဲ့ မိမိကအရမ်းရင်းနှီးရင်တော့ စကားကိုကရားရေလွှတ်ပြောတတ်သူပါ။ စကားကိုအတုံးအလိုက်ပြောတတ်သည်။ ချီးကျူးစရာရှိလျှင် အလွန်အကျူး ချီးကျူးတတ်သလို အပြစ်တွေ့ရင်လဲ အာမနားတမ်းပြောတတ်တဲ့ အကျင့်ရှိသူပါ။ ဘွင်ဘွင်ရှင်းရှင်းပြောတတ်သည်။ မသွယ်ဝိုက်တတ်ပေ။\nမိမိသည် စိတ်ကူးအလွန်ယဉ်သည်။ စိတ်ကူးနဲ့ လေထဲတိုက်အိမ်ဆောက်နေတတ်သည်။ စိတ်ကူးထားတာ ဖြစ်မလာရင်လဲ လွန်စွာ စိတ်ဓာတ်ကျတတ်သည်။ မိမိကထိုသို့ စိတ်ကူးနဲ့လုပ်မရပါ။ လက်တွေ့လုပ်ပါ။ အလုပ်ထဲကမှ ဘဝအတွက်အဆီအနှစ်တွေထုတ်ယူပါ။ လက်တွေဘဝကနေ အောင်မြင်မှုရှာပါ။");
						
						
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							dia.setTitle("သင်ဟာ ရာဇဖွားဖြစ်တဲ့အတွက်");
							dia.setMessage("စိတ်ထားကောင်းသည်။ စေတနာကောင်းသည်။ သနားငဲ့ညှာစိတ်ကြီးမားသည်။ သူများတွေကို အမြဲတွန်းတွန်းတိုက်တိုက်အားပေးတတ်သည်။ သူများတွေကိုလဲ အားရှိစေမည့်စကားတွေနဲ့အမြဲအားပေးတတ်သည်။ ပင်ကိုယ်သဘာဝအရ ရိုးသားသည်၊တည်ကြည်သည်။ သို့သော်ပျင်းရိတတ်သည်။ လုပ်မည်ဟု ဆုံးဖြတ်ထားပြီး အချိန်ဆွဲနေတတ်သည်။ တော်တော်နဲ့ မစဖြစ်ပေ။ လုပ်ပြီဆိုရင်လဲ နေ့မအိပ် ညမအိပ်လုပ်နိုင်တဲ့သူပါပဲ။ အလွန်ပင်ပန်းခံနိုင်သည်။ ထိုသိုအပင်ပန်း ခံသည့်အလုပ်တွေကလဲ မိမိစိတ်ပျော်မဲ့အလုပ်တွေသာရွေးလုပ်တာပါ။ စိတ်ချမ်းသာမှုကို အလွန်မြတ်နိုး အလေးထားသည်။ စထားပြီး အဆုံးမသတ်ဖြစ်တဲ့ အလုပ်တွေလဲ မိမိဆီမှာ အများကြီးပင်။ မိမိသည် စိတ်ညစ်တာ စိတ်ရှုပ်တာမခံနိုင်ပါ။\n\nမိမိသည်အားနာတတ်သည်။ အားနာလွန်းတာက မိမိအတွက်မကောင်းပါ။ မိမိသည် အားနည်းချက်များစွာရှိနေတတ်သည်။ ပေါ့ဆပြီး ပြီးစလွယ်လုပ်မည်၊ တစ်ခုခု လုပ်နေရင်း နောက်အသစ်တစ်ခုကိုစိတ်ပါသွားတတ်သည်။ စိတ်မငြိမ်။ အယူသည်းသည်။ ဇီဇာကြောင်တတ်သည်။ အငြင်းအခုန်သန်သည်။ မိမိသည် သူများတွေအတွက် အလွန်လွယ်ကူသောအလုပ်တွေကမိမိအတွက်ခက်ခဲနေတတ်သလို သူများတွေ မလုပ်နိုင်သော လက်လျှော့ထားသော အလုပ်တွေကိုလဲမိမိကအောင်မြင်အောင်လုပ်နိုင်သည်။ မိမိသည် ငြိမ်းငြိမ်းချမ်းချမ်းနေလိုသည်။ ကာယဝိဝေက စိတ္တဝိဝေက ဖြစ်သော နေရာမှာနေလိုသည်။ တစ်ယောက်ထဲလဲနေတတ်သည်။ အဖော်အပေါင်းအသင်းမမက်ပေ။ ဘဝင်မမြင့်တတ်ပေမဲ့ အလွန်မာနကြီးသည်။ ပညာမာန အလုပ်မာနရှိသည်။ သူများဆီက တစ်ပြားသားမှအလကားမလိုချင်သလို ကိုယ်ကလဲ တစ်ပြားသားမှမပေးချင်ပါ။ မိမိအားနှိမ့်ချဆက်ဆံထားသူအား မမေ့တတ်။ အခါအခွင့်ကြုံရင် ပြန်ကလဲ့စားခြေဖို့ စောင့်နေတတ်သည်။\n\nဆင်းရဲတဲ့မိဘက ပေါက်ဖွားပါစေ လူနေခြုံကြား စိတ်နေဘုံဖျား စိတ်မျိုးရှိသည်။ မတရားမှုများကိုလက်မခံတတ်ပေ။ မိမိဇာတာဟာ ကံအလွန်ကောင်းသည် မဟုတ် သော်လဲ ရည်မှန်းချက်ထားပြီးကြိုးစားတဲ့အတွက် အောင်မြင်လိမ့်မည်။ ရည်မှန်းချက်မရှိတဲ့ ရာဇဖွားတွေအတွက် အနာဂတ်မကောင်းနိုင်။ မိမိသည် သမိုင်းကိုစိတ်ဝင်စားသည်။ သူရဲကောင်းများ လူစွမ်းကောင်းများအား ကျတတ်ပြီး သူတို့လို ဖြစ်ချင်စိတ်ရှိမည်၊ ဂမ္ဘီရပစ္စည်းတွေစိတ်ဝင်စားသည်၊\n\nရှေးရိုးဆန်သည်။ ရိုးရာဓလေ့ထုံးစံကို လိုက်နာကျင့်\nသုံးသည်။ အမျိုးဘာသာ သာသနာကို ချစ်မြတ်နိုးသည်။မိမိသည် ထူးဆန်းသော ဂမ္ဘီရနှင့်နွယ်သော ကိစ္စများ ကိုလေ့လာလိုက်စားလိုသည်။ ငွေကြေးကို စည်းနှင့်ကမ်းနှင့်သုံးသည်။ နှမြောတတ်သည်။ ဒါပေမဲ့ မိမိလိုချင်တဲ့ပစ္စည်းဆိုရင် မတန်တဆနှင့်ရောင်းလဲ ဝယ်သည်။ မနှမြောတော့ပေ။ ဘဝတစ်ဝက်လောက်ထိ ငွေစုဆောင်းလို့မရတတ်ပေ။ စုလိုက်ကုန်လိုက်ဖြစ်နေ မည်။ ငွေနှင့်အလွန်နီးသော ဇာတာပါတယ်။ စိတ်ထဲမှာလောဘကြီးပေမဲ့ လက်တွေ့မှာ ရသမျှနှင့်ရောင်ရဲ လွယ်သည်။\n\nမိမိသတိထားရမည်က အိမ်ထောင်ရေးပါ။ သနားလို့အားနာလို့ မယူမိစေနဲ့။ လွယ်လွယ်ဆုံးဖြတ်ပြီး အိမ်ထောင်မပြုသင့်ပေ။ အိမ်ထောင်ရေးကံညံ့လွယ်သည်။ မိမိချစ်မြတ်နိုးရင်တောင် သူ့အကြောင်းသေချာလေ့လာပြီးမှယူသင့်သည်။ မိဘ လူကြီးတွေကပါ သဘောတူသည့်အိမ်ထောင်ဘက်ဆို အလွန်ကောင်းသည်။\n\nမိမိသည် ဒုက္ခကိုပဲ ဖြစ်ဖြစ် သုခကိုပဲဖြစ်ဖြစ် မည်သူ့ကိုမှထုတ်ဖော်မပြောတတ်ပါ။ သူများကိုဒုက္ခမပေးပါ၊ ပြဿ နာတွေကို မိမိတစ်ယောက်ထဲသာ ခါးစည်းခံလိုသည်၊ ဒါကြောင့်လဲ မိမိကိုကြည့်ရုံနှင့် ပျော်နေလား စိတ်ဆင်းရဲနေလား မခန့်မှန်းနိုင်ကြပါ။ မိန်းမ\nတွေနဲ့ ပက်သက်ပြီးအကူအညီတွေရနိုင်သည်၊ စပ်တူရှယ်ယာ လွန်စွာအကျိုးပေးသည်။");
							
							
						}
						else {
							if (mmm.getText().toString().equals("စနေ")) {
								dia.setTitle("သင်ဟာ ပုတိဖွားဖြစ်တဲ့အတွက်");
								dia.setMessage("အရာရာတိုင်းကို လက်တွေ့မှ ယုံကြည်တတ်ကြသည်။ယထာဘူတကျမှ လက်ခံတတ်သည်။ သူများက မြှောက်ပြောတိုင်းလဲ ဘဝင်မမြင့်တတ်သလို ခြောက်ပြောတိုင်းလဲ မကြောက်တတ်ပေ။ စည်းနဲ့ကမ်းနဲ့နေတတ်သည်။ အောက်သက်ကြေသည်။ ပေးပြီးသားကတိကို တည်အောင်ထိန်းသည်။ မည်သည့်အလုပ်ကိုမဆို လေးလေးစားစားလုပ်တတ်သည်။ လူအများ၏ အထင်ကြီးခြင်း လေးစားခြင်းခံရမည်။ စည်းရုံးရေးကောင်းသည်။ဒါပေမဲ့ မိမိ၏ ကိုယ်စွမ်းကိုယ်စများကို မထုတ်ဖော်နိုင်တဲ့ ပုတိဖွားတွေ မအောင်မြင်တတ်ပေ။ မိမိအောင်မြင်ဖို့ ပတ်ဝန်းကျင်ကောင်း အသိုင်းအဝိုင်းကောင်းမှရသည်။\n\nဘဝတစ်လျှောက်လုံး ရုန်းကန်လှုပ်ရှားနေရတတ်သည်။ အတတ်အကျများသည်။ တုန်လှုပ်ဖွယ်ရာ ဘေးဆိုးများ မမျှော်လင့်တာသော ပြဿ နာများးလဲ မကြာခဏကြုံရတတ်သည်။ ဒါပေမဲ့ ဒုက္ခတွေကြားက သီသီလေးလွတ်မြောက်တတ်သည်။ အမြဲတမ်းအလကားမနေတတ်။ တစ်ခုခုလုပ်နေရမှကျေနပ်ကြသည်။ အပြင်ပန်းအမြင်မှာ အေးဆေးတည်ငြိမ်တယ် ထင်ရပေမဲ့ စိတ်တိုဒေါသထွက်လျှင် အမှန်အမှားမခွဲခြားတတ်တော့ပေ။ ထိန်းသိမ်းနိုင်စွမ်းနည်းကြသည်။ ဘဝတိုက်ပွဲအမြဲ ဆင်နွဲနေရမှ ကျေနပ်နေတတ်ကြတယ်။\n\nအရာရာ ပြတ်ပြတ်သားသား ဆောင်ရွက်သည်။ တစ်ခါတလေအားနာတတ်သော်လဲ အားမနာတာကများတယ်။ ရဲတင်းလွန်ခြင်း ဦဆောင်ရဲခြင်းက လူအများရဲ့သြဘာ ပေးခြင်းခံရတတ်သည်။ မိမိသည်စိတ်ကောင်းစိတ်ဆိုး တစ်လှည့်ဆီဖြစ်မည်။ သူတော်ကောင်းစိတ် ဝင်နေရင်သူများထက် သူများထက်ကောင်းတတ်ပြီး စိတ်ဆိုးစိတ်ယုတ်ဝင်လာရင် ဘီလူးထက်မိုက်ပြတတ်သည်။ ပုတိဖွား\nတွေဟာ ငယ်ငယ်ကဖတ်ဖူးတဲ့ ကျေးညီနောင်ပုံပြင်လိုပါပဲ။သူတော်ကောင်းနဲ့နီးရင် သူတော်ကောင်းဖြစ်သွားတတ်သလို သူယုတ်မာနဲ့ နီးရင် သူယုတ်မာဖြစ်သွားတတ်ပါတယ်။ ဒါကြောင့် အောင်မြင်နေတဲ့ပုတိဖွားတွေကိုသုတေသနပြုကြည့်တဲ့အခါမှာ ပတ်ဝန်းကျင်ကောင်းမှာ နေခဲ့ရတာကို တွေ့ရပါတယ်။\nမိမိသည် အခွင့်အရေးတွေကို လက်လွတ်မခံတတ်ဘဲရအောင်ယူတတ်သူပါပဲ။ ဖြောင့်မတ်ရိုးသားသူတွေပါပဲ။ စိတ်အခန့်မသင်လျှင် ဒေါသထွက်လွယ်သည်။ ဒေါသကြီးတာ ဒေါသထွက်လွယ်တာကို ရှောင်သင့်တယ်၊အောင်မြင်မှုအတွက်အတားအဆီး ဖြစ်နိုင်လို့ပါပဲ။ နာမည်ကျော်ကြားလွယ်တဲ့ဇာတာပါပဲ။ ကောင်းတာလုပ်ရင်နာမည်ကောင်းနဲ့ကျော်ကြားသလို ဆိုးတာလုပ်ရင်လဲနာမည်ဆိုးကို ဖုံးဖိထားလို့မရပါဘူး။\n\nမိမိသည်ငွေနှင့်နီးတဲ့ ဇာတာပါပဲ။ မကြာခဏငွေရတတ်သည်။ ငွေကို စည်းနဲ့ကမ်းနဲ့ သုံးမယ်လို့ ရည်မှန်းထားသော်လည်း လက်တွေ့မှာတော့လက်ဖွာတတ်သူပါပဲ။ ရှိရင်ရှိသလိုသုံးတတ်ပြီး မရှိရင်ရေသောက်ဗိုက်မှောက်နေတတ်သူပါပဲ။ စုလိုက်ကုန်လိုက်ပါပဲ။ ဘဝမှာ ဒုတိယအရွယ်ကအလွန်ကောင်းမည်။အောင်မြင်မည်။ ကျော်ကြားမည်။ လူအထင်ကြီးခြင်းခံရမည်။ မိမိဘဝဟာ မကြာခဏအပြောင်းအလဲကြုံရ တတ်သည်။ အလုပ်မှာလဲ လက်ငါးချောင်းထက်မနည်းပြောင်းလဲလုပ်ကိုင်နေရတတ်သည်။ ပုတိဖွားတွေဟာ မူရင်း စိတ်ထားဖြူစင်ပေမဲ့ ပတ်ဝန်းကျင်ကြောင့် အရောင်ပြောင်းသွားတတ်သည်။ အိမ်ထောင်ဘက်ကောင်းရတတ်သည်။ သားသမီးအကျိုးမခံစားရတတ်ပေ။");
								
								
							}
							else {
								if (mmm.getText().toString().equals("အင်္ဂါ")) {
									dia.setTitle("သင်ဟာ အဓိပတိဖွားဖြစ်တဲ့အတွက်");
									dia.setMessage("အဓိပတိဆိုတဲ့အတိုင်းပဲ သူ့တို့တွေဟာ ခေါင်းဆောင်လုပ်လိုကြတယ်။ သြဇာပေးလို့ကြတယ်။\nအကြံပေးချင်ကြတယ်။ သူများနောက်လိုက်မလုပ်လို။ လူ့အောက်ကျို့ သိပ်မခံချင်ကြဘူး။ မိမိသာဘယ်အရာကိုမဆို စိတ်ပါလက်ပါလုပ်မယ်ဆို ထိပ်ဆုံးရောက်နိုင်တဲ့ သူတွေပါ။ လက်တွေ့မှာတော့ စိတ်ကူးများနေတတ်တယ်၊လေထဲတိုက်အိမ်ဆောက်နေတတ်ကြတယ်။ စီမံကိန်းတွေချ ၊ planတွေချပြီး လက်တွေမလုပ်ဖြစ်တတ်ပါ။\n\nမိမိ ဉာဏ်ရည်ထက်မြက်သည်။ အတွေးအခေါ်ကောင်းသည်။ သင်ပြရလွယ်သည်။ သူများတစ်နှစ်လောက်သင်ရတဲ့ပညာကို မိမိက တစ်လလောက်သင်တာနဲ့ တတ်မြောက်သည်။ ထီထွင်ဖန်တီးလိုစိတ် ပြင်းထန်သည်။ မိမိက ကာယအားမကိုးချင်။ ဉာဏ်နသာ စိုက်ထုတ်လုပ်ချင်သည်။ ကျောပူမခံနိုင်ပေမဲ့ ခေါင်းပူခံနိုင်ကြတယ်။မိမိက အရာရာစိတ်ဝင်တစား လေ့လာလိုက်စားတတ်သည်။ အလုပ်တစ်ခုကိုလဲ ဇောက်ချမလုပ်ချင်ကြပေ။ ပညာရပ်တွေကိုလဲ နည်းနည်းစီလိုက်စားထားသည်။ ဒါကြောင့် သူ့တို့မသိတဲ့ ကဏ္ဍမရှိ ၊ အတွင်းကျကျသိသည်လဲမဟုတ်ပေ။ အပေါ်ယံသာသိသည်။\n\nအဓိပတိဖွားတွေဟာ စကားပြောကောင်းကြသည်၊ကိုယ့်ဘက်ပါအောင်စည်းရုံးတတ်သည်။ ပီယဝါစာ စကားတွေနဲ့ လူအများကို ဆွဲဆောင်နိုင်ကြတယ်။ အဓိပတိ ဖွားတွေဟာ အနုပညာဗီဇပါကြသည်။ စန်းရှိသည်။ အနုပညာ လက်မှုပညာတွေနဲ့ အောင်မြင်တတ်သည်။စိတ်ရှည်ဇွဲသန်ဖို့တော့ လိုတာပေါ့။ အဓိပတိဖွားတွေကငွေနဲ့ဝေးတဲ့ဇာတာပါတယ်။ လိုက်လေဝေးလေဖြစ်နေတတ်တယ်။ ငွေအစုလိုက်ရမယ်ဆိုပြီး မရဘဲဖြစ်နေတတ်တယ်။ အမွေရရင်တောင် မိမိခွဲတမ်းကနည်းနေတတ်တယ်။ မမျှော်လင့်ဘဲ ငွေရရင် အဖတ်မတင်ဘဲကုန်သွားတတ်တယ်၊\n\nမိမိရဲ့ ပြင်ရမဲ့အချက်တွေထဲမှာ သနားတတ်တာရောအားနာတတ်တာရောပါတယ်။ သနားလို့ ငွေချေးရင် ဆုံးမှာပဲ။ အားနာလို့ ချေးလိုက်ရင်လဲ လှူလိုက်တယ်လို့ပဲ သဘောထားရလိမ့်မယ်။ မိမိက သူများငိုပြရင် လွန်စွာသနားတတ်သည်။ ရှိတာလေးထုတ်ပေးတတ်တယ်။ ငွေအချေးအဌားကြောင့် ဘဝမှာ ခဏခဏစိတ်ဆင်းရဲရမည်။အကြွေးပြန်မရလို့ အကူအညီလာတောင်းတဲ့ သူတွေဟာအဓိပတိဖွားတွေ အများဆုံးဖြစ်နေတာတွေ့ရတတ်တယ်။\n\nမိမိကံဇာတာအောက်လက်ငယ်သားတော်လှန်မဲ့ ဇာတာပါ၊\nတပည့်မွေးလို့မရဘူး၊ ကိုယ်ကစေတနာနဲ့ တပည့်ကိုလိုက်လိုက်ရောရောနေပြီး ပညာကုန်သင်ပေးရင် မိမိကိုအာခံလိမ့်မယ်၊ ကိုယ်မွေးတဲ့မျောက်က ကိုယ့်ကိုပြန်ခြောက်တတ်တယ်။ မိမိစေတနာကိုနားမလည်ဘူး၊ မိမိကိုပမာမခန့် လုပ်တတ်တယ်။ မိမိစေတနာကိုစော်ကားတတ်တယ်။ မိမိဟာ အေးအေးချမ်းချမ်းနေတတ်ကြတယ်။ ရိုးရိုးသားသားနေမယ်။ ဒါကြောင်ပဲ မိမိကိုယ် ပတ်ဝန်းကျင်က ငွေရှိတယ်။ ချမ်းသာတယ်ဟုထင်တတ်ကြသည်။ လက်တွ့မှာတော့ အမြဲတမ်းဘိုင်ကျနေမည်။ငွေမကြာခဏပြတ်နေတတ်သည်။\n\nမိမိက လူမှုရေး နိုင်ငံရေး စိတ်ဝင်စားမည်။ ဒါကြောင့်ပဲ ရပ်ကွက်ကောင်းစားရေးက စပြီး လုပ်နေမိတတ်သည်။အများအတွက် စေတနာဝန်ထမ်းလုပ်နေရတတ်သည်။မိမိသည် ငွေအစုလိုက်ဝင်သည်။ လူမှုရေး ပရဟိတရပ်ရွာကောင်းစားရေးအတွက်နဲ့ပဲ ထိုငွေပြန်ကုန်တတ်သည်။ မိမိဘဝမှာအောင်မြင်လိုရင် ကြိုးစားပါ။ အတ္တနဲ့ပရမျှတစွာလုပ်ပါ။ ဇွဲရှိပါ။ ကံဉာဏ်ဝီရိယ သုံးပါးမှာ မိမိကကံကောင်း ဉာဏ်ကောင်းပြီး ဝီရိယနည်းနေပါလိမ့်မည်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _dasaname() {
		if (textview11.getText().toString().equals("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)")) {
			dasa1.setText("စနေ");
			dasa2.setText("ကြာသပတေး");
			dasa3.setText("ရာဟု");
			dasa4.setText("သောကြာ");
			dasa5.setText("တနင်္ဂနွေ");
			dasa6.setText("တနင်္လာ");
			dasa7.setText("အင်္ဂါ");
			dasa8.setText("ဗုဒ္ဓဟူး");
		}
		else {
			if (textview11.getText().toString().equals("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)")) {
				dasa1.setText("တနင်္ဂနွေ");
				dasa2.setText("တနင်္လာ");
				dasa3.setText("အင်္ဂါ");
				dasa4.setText("ဗုဒ္ဓဟူး");
				dasa5.setText("စနေ");
				dasa6.setText("ကြာသပတေး");
				dasa7.setText("ရာဟု");
				dasa8.setText("သောကြာ");
			}
			else {
				if (textview11.getText().toString().equals("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)")) {
					dasa1.setText("တနင်္လာ");
					dasa2.setText("အင်္ဂါ");
					dasa3.setText("ဗုဒ္ဓဟူး");
					dasa4.setText("စနေ");
					dasa5.setText("ကြာသပတေး");
					dasa6.setText("ရာဟု");
					dasa7.setText("သောကြာ");
					dasa8.setText("တနင်္ဂနွေ");
				}
				else {
					if (textview11.getText().toString().equals("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)")) {
						dasa1.setText("အင်္ဂါ");
						dasa2.setText("ဗုဒ္ဓဟူး");
						dasa3.setText("စနေ");
						dasa4.setText("ကြာသပတေး");
						dasa5.setText("ရာဟု");
						dasa6.setText("သောကြာ");
						dasa7.setText("တနင်္ဂနွေ");
						dasa8.setText("တနင်္လာ");
					}
					else {
						if (textview11.getText().toString().equals("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)")) {
							dasa1.setText("ဗုဒ္ဓဟူး");
							dasa2.setText("စနေ");
							dasa3.setText("ကြာသပတေး");
							dasa4.setText("ရာဟု");
							dasa5.setText("သောကြာ");
							dasa6.setText("တနင်္ဂနွေ");
							dasa7.setText("တနင်္လာ");
							dasa8.setText("အင်္ဂါ");
						}
						else {
							if (textview11.getText().toString().equals("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)")) {
								dasa1.setText("ကြာသပတေး");
								dasa2.setText("ရာဟု");
								dasa3.setText("သောကြာ");
								dasa4.setText("တနင်္ဂနွေ");
								dasa5.setText("တနင်္လာ");
								dasa6.setText("အင်္ဂါ");
								dasa7.setText("ဗုဒ္ဓဟူး");
								dasa8.setText("စနေ");
							}
							else {
								if (textview11.getText().toString().equals("သောကြာသက်ရောက်(သုခံလောကဓံ)")) {
									dasa1.setText("သောကြာ");
									dasa2.setText("တနင်္ဂနွေ");
									dasa3.setText("တနင်္လာ");
									dasa4.setText("အင်္ဂါ");
									dasa5.setText("ဗုဒ္ဓဟူး");
									dasa6.setText("စနေ");
									dasa7.setText("ကြာသပတေး");
									dasa8.setText("ရာဟု");
								}
								else {
									if (textview11.getText().toString().equals("ရာဟုသက်ရောက်(ယသောလောကဓံ)")) {
										dasa1.setText("ရာဟု");
										dasa2.setText("သောကြာ");
										dasa3.setText("တနင်္ဂနွေ");
										dasa4.setText("တနင်္လာ");
										dasa5.setText("အင်္ဂါ");
										dasa6.setText("ဗုဒ္ဓဟူး");
										dasa7.setText("စနေ");
										dasa8.setText("ကြာသပတေး");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
	}
        function _thet() {
		if (_matchesLokadhamTitle("အင်္ဂါ")) {
			html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>အယသောလောကဓံ (ခေါ်) အင်္ဂါသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n\n        .intro {\n            border-left: 4px solid #5d4037;\n            padding-left: 15px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">အယသောလောကဓံ (ခေါ်) အင်္ဂါသက်ရောက်</h1>\n\n    <div class=\"intro\">\n        <p>ပြီးခဲ့တဲ့ ရာဟုသက်ရောက်ကာလက အရာရာ အဆင်ပြေခဲ့ကြသူတွေဟာ အင်္ဂါသက်ရောက်ရောက်လာတာနဲ့ အခက်အခဲမျိုးစုံ စတင်ကြုံတွေ့ရတတ်ပါတယ်။ ဒီကာလမှာ အရင်က ခင်မင်ရင်းနှီးခဲ့သူတွေလည်း တဖြည်းဖြည်းနဲ့ ဝေးကွာသွားတတ်ပြီး ဘာလုပ်လုပ် အဆင်မပြေ ဖြစ်နေတတ်ပါတယ်။ အင်္ဂါဂြိုဟ်ဟာ စိတ်ပိုင်းဆိုင်ရာကို လွှမ်းမိုးတဲ့အတွက် စိတ်ထိခိုက်စရာတွေနဲ့ ရင်ဆိုင်ရနိုင်ပါတယ်။</p>\n        <p>တကယ်တော့ <b>အယသော</b>ဆိုတာ လောကဓံရဲ့ အဆိုးတရားတွေ ဝင်ရောက်လာမယ့် တံခါးပေါက်တစ်ခုပါပဲ။ ဒီကာလမှာ လူတိုင်းဟာ ကိုယ်လုပ်ခဲ့တဲ့ ကောင်းမှု၊ မကောင်းမှုအလိုက် စိတ်ရောကိုယ်ပါ ဆင်းရဲဒုက္ခတွေ ခံစားရနိုင်ပါတယ်။ စိတ်က ဘာကြောင့်မှန်းမသိဘဲ ရှုပ်ထွေးနေတတ်ပြီး စိတ်ညစ်နေတတ်ပါတယ်။ အထူးသဖြင့် ငွေကြေးကိစ္စတွေနဲ့ပတ်သက်ပြီး အိမ်ထောင်ရေး ပြဿနာတွေ ကြုံရတတ်ပါတယ်။ ကျန်းမာရေးကလည်း ရောဂါရှာမရဘဲ ငွေကုန်ခံ ကုသနေရတတ်ပြီး မိသားစုထဲက တစ်ဦးဦး နာမကျန်းဖြစ်တာမျိုးတွေလည်း ကြုံရတတ်ပါတယ်။</p>\n        <p>ဒါကြောင့် ဒီကာလမှာ စိတ်ကို မထိန်းချုပ်နိုင်ရင် မှားယွင်းတဲ့ ဆုံးဖြတ်ချက်တွေ ချမိပြီး နောက်ပြန်ဆုတ်မရတဲ့ အခြေအနေတွေ ဖြစ်သွားနိုင်ပါတယ်။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">အင်္ဂါသက်ရောက်ကာလအတွက် သတိပြုစရာများ</h2>\n    <p>ဒီလို ဆိုးကျိုးတွေကနေ ကင်းဝေးစေဖို့အတွက် အောက်ပါအချက်တွေကို သတိထားသင့်ပါတယ်။</p>\n    <ul>\n        <li>စိတ်ကို ထိန်းချုပ်ပါ။ လောဘ၊ ဒေါသနဲ့ မာနတွေကို လျှော့ချပါ။</li>\n        <li>အတုမယူပါနဲ့။ သူများတွေလို လောဘကြီးတိုင်း လိုက်မကြီးပါနဲ့။ ပျော်တိုင်းလည်း လိုက်မပျော်ပါနဲ့။ ကိုယ်လုပ်လိုက်တဲ့ အရာတွေကြောင့် နောက်ပိုင်းမှာ နောင်တရပြီး မျက်ရည်ကျရနိုင်ပါတယ်။</li>\n        <li>ကြွားဝါခြင်း ရှောင်ပါ။ သူများတွေလို လိုက်လှချင်တာ၊ လိုက်ကြွားချင်တာမျိုး ရှောင်ပါ။ ကြွားဝါမိရင် အရှက်ကွဲရတတ်ပါတယ်။</li>\n        <li>တစ်ကိုယ်တည်း ရပ်တည်ပါ။ ဘယ်သူ့ကိုမှ အားမကိုးဘဲ ကိုယ့်အားကိုယ်ကိုးပါ။ ရှိတာလေးနဲ့ ရောင့်ရဲတင်းတိမ်နေထိုင်ပါ။</li>\n        <li>တရားဓမ္မနဲ့ နေထိုင်ပါ။ ကိုယ်၊ စိတ်၊ နှုတ် သုံးပါးလုံး တည်ငြိမ်အောင် နေထိုင်ပြီး တရားဘာဝနာ ပွားများပါ။</li>\n        <li>အလုပ်တိုးချဲ့တာ ရှောင်ပါ။ စီးပွားရေးလုပ်ငန်းတွေမှာ ရင်းနှီးမြှုပ်နှံတာမျိုး ရှောင်ပါ။ လုပ်ငန်းကြီးတွေ စတင်တာ၊ တိုးချဲ့တာမျိုး လုပ်မိရင် အောက်ကျတတ်ပါတယ်။ မသမာတဲ့နည်းနဲ့ စီးပွားရှာသူတွေဟာ ထောင်ဒဏ်ကျခံရနိုင်ပါတယ်။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">ရှောင်ရန်အချက်များ</h2>\n    <p>ဒီကာလမှာ အောက်ပါအချက်တွေကို အထူးရှောင်ကြဉ်သင့်ပါတယ်။</p>\n    <ul>\n        <li>အိမ်ပြင်တာ၊ အိမ်ဆောက်တာ၊ အိမ်ပြောင်းရွှေ့တာတွေ မလုပ်ပါနဲ့။</li>\n        <li>ငွေကြေးချေးငှားတာ၊ အာမခံတာတွေ မလုပ်ပါနဲ့။</li>\n        <li>စပ်တူစီးပွားရေး အကြီးအကျယ် မလုပ်ပါနဲ့။</li>\n        <li>လူမှုရေးကိစ္စတွေမှာ ဦးဆောင်တာ မလုပ်ပါနဲ့။</li>\n        <li>အပျော်ခရီးတွေ မသွားပါနဲ့။</li>\n        <li>အကြွေးတောင်းတာ၊ အကြွေးပေးတာတွေ ရှောင်ပါ။</li>\n        <li>လောဘ၊ ဒေါသကို မကြီးပါစေနဲ့။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">ခုနစ်ရက်သားသမီးများအတွက် ဟောကွက်များ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>၁။ တနင်္လာ၊ အင်္ဂါ၊ ကြာသပတေးသားများ</h4>\n            <p>(မဟာဘုတ် ၀ ကြွင်း မပါ)</p>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - အခက်အခဲကြုံပြီး စိတ်ဓာတ်ကျတတ်ပါတယ်။ လက်ရှိအလုပ်နဲ့ပဲ ရောင့်ရဲတင်းတိမ်နေထိုင်သင့်ပါတယ်။</li>\n                <li><strong>အိမ်ထောင်ရေး</strong> - အိမ်ထောင်ရေး မပြေလည်တတ်ပါဘူး။ သည်းခံပြီး ခွင့်လွှတ်စိတ် မွေးမြူသင့်ပါတယ်။</li>\n                <li><strong>ပညာရေး</strong> - ကောင်းမွန်တဲ့ကာလဖြစ်ပြီး ကြိုးစားရင် အောင်မြင်နိုင်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>၂။ တနင်္ဂနွေသားသမီး (ဦးညို) နှင့် ဗုဒ္ဓဟူးသားသမီး (အင်းဝ)</h4>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - ဘာလုပ်လုပ် မအောင်မြင်ဘဲ စွန့်စားပြီး အလုပ်တိုးချဲ့မိရင် ရှိတာတွေပါ ကုန်သွားနိုင်ပါတယ်။</li>\n                <li><strong>လူမှုရေး</strong> - လူတွေက အထင်အမြင်လွဲမှားပြီး ဂုဏ်သိက္ခာထိခိုက်နိုင်ပါတယ်။</li>\n                <li><strong>အိမ်ထောင်ရေး</strong> - အိမ်ထောင်မပြုသင့်ပါဘူး။ လက်ရှိအိမ်ထောင်ရေးမှာလည်း စကားများတတ်ပါတယ်။</li>\n                <li><strong>ကျန်းမာရေး</strong> - ကျန်းမာရေးချို့တဲ့ပြီး ထိခိုက်ဒဏ်ရာရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>၃။ သောကြာသားသမီး (ဘုမ္မိ) နှင့် စနေသားသမီး (ဘုမ္မိ)</h4>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - စီးပွားရေး မကောင်းပါဘူး။ သည်းခံပြီး လုပ်ကိုင်သင့်ပါတယ်။</li>\n                <li><strong>လူမှုရေး</strong> - ဂုဏ်သိက္ခာကျဆင်းပြီး လူအများရဲ့ ဝေဖန်မှုကို ခံရတတ်ပါတယ်။</li>\n                <li><strong>ပညာရေး</strong> - လုံးဝမကောင်းဘဲ စိတ်လေလွင့်ပြီး ကြိုးစားလိုစိတ် မရှိဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>ကျန်းမာရေး</strong> - စိတ်ဆင်းရဲမှုကြောင့် ကျန်းမာရေး ဆိုးရွားစွာ ထိခိုက်နိုင်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">မူလမဟာဘုတ် ၀ ကြွင်းများ</h2>\n    <p>မဟာဘုတ် ၀ ကြွင်းသူတွေဟာ အင်္ဂါသက်ရောက်တိုင်း မရဏသက်ရောက် ဖြစ်ပါတယ်။ ဒီကာလမှာ ရူးသွပ်တာ၊ ကိုယ်လက်အင်္ဂါ ထိခိုက်တာ၊ ဆေးမှား၊ အစာမှားတာ၊ ပယောဂဖြစ်တာမျိုးတွေ ကြုံရတတ်ပါတယ်။</p>\n    <div class=\"note\">\n        <p>အထူးသဖြင့် အောက်ပါနေ့သား၊ အသက်တွေဟာ ဂြိုဟ်အိပ်ကြီးနဲ့ သက်ရောက် မရဏနှစ်ထပ်ဖြစ်လို့ သတိထားသင့်ပါတယ်။</p>\n        <ul>\n            <li>တနင်္ဂနွေသားသမီး - ၂၇ နှစ်</li>\n            <li>တနင်္လာသားသမီး - ၁၈ နှစ်</li>\n            <li>သောကြာသားသမီး - ၄၅ နှစ်</li>\n        </ul>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">အယသောလောကဓံ (အင်္ဂါသက်ရောက်) ယတြာ</h2>\n    <p>ဒီကာလမှာ စိတ်ပိုင်းဆိုင်ရာ မတည်ငြိမ်မှုတွေ ဖြစ်တတ်ပြီး လုပ်ငန်းတွေ ဆုတ်ယုတ်တတ်ပါတယ်။ ဒါကြောင့် သည်းခံခြင်းနဲ့ ခွင့်လွှတ်ခြင်းဟာ အကောင်းဆုံး ယတြာပါပဲ။</p>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ဆောင်ရွက်သင့်သည့် ယတြာများ</h4>\n            <ul>\n                <li>မွေးနေ့မှာ ဥပုသ်စောင့်ပြီး သက်သတ်လွတ် စားပါ။</li>\n                <li>အိမ်တွင်းသန့်ရှင်းရေးကို ကိုယ်တိုင် မှန်မှန်လုပ်ပါ။</li>\n                <li>သောက်ရေအိုး၊ ညောင်ရေအိုး နေ့စဉ် ဖြည့်လဲပေးပါ။</li>\n                <li>သက်ကြီးဝါကြီးများကို မကြာခဏ ကန်တော့ပါ။</li>\n                <li>မွေးနေ့ မနက် ၉ နာရီမှ ၁၀ နာရီအတွင်း ထမနဲ သို့မဟုတ် ကောက်ညှင်းပေါင်းကို နှမ်းများများနဲ့ ဘုရားဆွမ်းကပ်ပါ။</li>\n                <li>အိပ်ရာထ၊ အိပ်ရာဝင်တိုင်း တတ်နိုင်သမျှ ပုတီးစိပ်ပါ။</li>\n                <li>မည်သူ့ကိုမှ သြဇာမပေးပါနဲ့။</li>\n            </ul>\n        </div>\n    </div>\n    <p>ဒီလို ပြုလုပ်ခြင်းအားဖြင့် အင်္ဂါသက်ရောက်ရဲ့ ဘေးဆိုးတွေကနေ ကင်းဝေးနိုင်ပါတယ်။</p>\n\n</body>\n</html>\n\n";
			_loadLokadhamHtml();
		}
		else {
			if (_matchesLokadhamTitle("တနင်္ဂနွေ")) {
				html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>ပဿံသာလောကဓံ (ခေါ်) တနင်္ဂနွေသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n        .highlight {\n            background-color: #e8f5e9;\n            padding: 15px;\n            border-left: 4px solid #4CAF50;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">ပဿံသာလောကဓံ (ခေါ်) တနင်္ဂနွေသက်ရောက်</h1>\n\n    <div class=\"highlight\">\n        <p>တနင်္ဂနွေသက်ရောက် (ပဿံသာဂြိုဟ်) ဟာ လောကီဂြိုဟ်ခွင်ထဲက ဂြိုဟ်ကောင်းတစ်ခု ဖြစ်ပါတယ်။ ဒီကာလမှာ ကိုယ်ကျင့်တရားကောင်းမွန်သူတွေအတွက် အကောင်းဆုံး အကျိုးပေးတွေ ရရှိနိုင်ပါတယ်ခင်ဗျာ။</p>\n        <p>ဒီဂြိုဟ်သက်ရောက်ကို <b>\"အိမ်ထောင်မင်္ဂလာ\"</b> လို့လည်း အဓိပ္ပာယ်ဖွင့်ဆိုကြပါတယ်။ ဒါကြောင့် ဒီကာလမှာ လက်ထပ်မင်္ဂလာပွဲ၊ ရှင်ပြု၊ ရဟန်းခံ စတဲ့ မင်္ဂလာပွဲတွေ အောင်မြင်စွာ ကျင်းပနိုင်ပါတယ်။ ဒါ့အပြင် ဘုရားတည်၊ ကျောင်းဆောက်၊ သိမ်ဆောက်စတဲ့ ကုသိုလ်ကောင်းမှုတွေလည်း စိတ်တိုင်းကျ ပြုလုပ်နိုင်ပါတယ်။</p>\n        <p>ဒီအချိန်ဟာ ကိုယ်စွမ်းဉာဏ်စွမ်းရှိသလောက် ကြိုးစားလုပ်ဆောင်ရင် အရာရာ အောင်မြင်နိုင်တဲ့ ကာလတစ်ခုပါ။ အတိတ်က ကံကောင်းမှုတွေကြောင့် ရာထူးတိုးတာ၊ စည်းစိမ်တွေခံစားရတာနဲ့ ဘွဲ့ထူးဂုဏ်ထူးတွေ ရရှိတာမျိုး ဖြစ်နိုင်ပါတယ်။</p>\n        <p>ဒါပေမဲ့ ရာဟုနဲ့ သောကြာသက်ရောက်မှာ မကောင်းမှုတွေ လုပ်ခဲ့သူတွေ၊ ဒုစရိုက်သမားတွေနဲ့ မဟာဘုတ်မှာ မရဏဖြစ်နေသူတွေကတော့ ဒီဂြိုဟ်ရဲ့ ကောင်းကျိုးကို အပြည့်အဝ ခံစားရမှာ မဟုတ်ပါဘူး။</p>\n        <p>တနင်္ဂနွေသက်ရောက်ကာလဟာ အိမ်ထောင်ပြုဖို့အတွက် အကောင်းဆုံးအချိန် ဖြစ်ပါတယ်။ ဒါပေမဲ့ မဟာဘုတ် ၅ ကြွင်း အမျိုးသား၊ အမျိုးသမီးတွေတော့ မပါဝင်ပါဘူး။ ဒီကာလမှာ မိမိဟာ ပတ်ဝန်းကျင်မှာ ဩဇာအာဏာ ကြီးမားလာပြီး လူအများရဲ့ ချီးမွမ်းခြင်းကို ခံရတတ်ပါတယ်။ ကိုယ်တိုင် ကြွားဝါစရာမလိုဘဲ အလိုလို ထင်ပေါ်ကျော်ကြားနေမှာ ဖြစ်ပါတယ်ခင်ဗျာ။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">တနင်္ဂနွေ (ပဿံသာ) ကာလမှာ ရရှိနိုင်တဲ့ အကျိုးပေး</h2>\n    <ul>\n        <li>ငွေစုရတာ အလွန်လွယ်ကူပြီး ငွေအထုပ်လိုက် ဝင်တတ်ပါတယ်။</li>\n        <li>အလုပ်အကိုင် တိုးချဲ့ရင် အောင်မြင်ပါတယ်။</li>\n        <li>အိမ်သစ်ဆောက်တာ၊ အိမ်ဝယ်တာတွေ ပြုလုပ်နိုင်ပါတယ်။</li>\n        <li>ရန်သူအတိုက်အခံတွေကို အနိုင်ရပြီး လူအများရဲ့ ထောက်ခံမှုကို ရရှိပါလိမ့်မယ်။</li>\n        <li>မမျှော်လင့်တဲ့ အကျိုးခံစားခွင့် ရနိုင်ပါတယ်။</li>\n        <li>အိမ်ထောင်ပရိဘောဂနဲ့ အိမ်သုံးပစ္စည်းတွေ ဝင်တတ်ပါတယ်။</li>\n        <li>အကြံအစည်တွေ အောင်မြင်ပြီး အရာရာ တိုးတက်မှုတွေ ရရှိနိုင်ပါတယ်။</li>\n        <li>ရောက်တဲ့နေရာမှာ ဘာလုပ်လုပ် အောင်မြင်ပြီး အပေါင်းအသင်း ကူညီထောက်ပံ့မှုတွေလည်း ရပါလိမ့်မယ်။</li>\n        <li>ပတ်ဝန်းကျင်မှာ မျက်နှာပွင့်ပြီး ဩဇာတိက္ကမရှိတဲ့သူ ဖြစ်လာပါလိမ့်မယ်။</li>\n        <li>သားသမီးတွေအတွက် မင်္ဂလာပွဲတွေ အောင်မြင်စွာ ဆောင်ရွက်ပေးနိုင်ပါလိမ့်မယ်။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">ကြုံတွေ့ရတတ်တဲ့ ဆိုးကျိုးများ</h2>\n    <ul>\n        <li>အတိုက်အခံ၊ အပြိုင်အဆိုင် အမှုအခင်းတွေ ကြုံတွေ့နိုင်ပါတယ်။</li>\n        <li>အိမ်နဲ့ပတ်သက်တဲ့ အမှုအခင်းတွေ၊ ပြဿနာတွေ ဖြစ်ပေါ်နိုင်ပါတယ်။</li>\n        <li>အိမ်ထောင်ရေးပြဿနာတွေ၊ လင်ကွာ၊ မယားကွာတွေ ဖြစ်နိုင်ပါတယ်။</li>\n        <li>အိမ်မီးလောင်တာမျိုး ဖြစ်တတ်ပါတယ်။</li>\n        <li>အမှတ်မထင် ထောင်ကျတာမျိုး ဖြစ်နိုင်ပါတယ်။</li>\n        <li>လူဆိုး၊ ခါးပိုက်နှိုက်၊ လူလိမ်တွေနဲ့ ကြုံတွေ့ရနိုင်ပါတယ်။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">တနင်္ဂနွေသက်ရောက်မှာ အောင်မြင်ဖို့ လုပ်ဆောင်ရန်</h2>\n    <ul>\n        <li>ပျင်းရိခြင်းကို ရှောင်ပြီး လုံ့လဝီရိယနဲ့ ကြိုးစားလုပ်ကိုင်ပါ။</li>\n        <li>မိမိအတွက် အကျိုးရှိမယ့်အလုပ်တွေကို ဦးစားပေးလုပ်ပါ။ အကျိုးမရှိတဲ့ လူမှုရေးကိစ္စတွေမှာ အချိန်ကုန်ခံတာမျိုး ရှောင်ပါ၊ ဒီလိုကောင်းတဲ့အခွင့်အရေးဟာ နောက်ထပ် ၈ နှစ်ကြာမှ ပြန်လာမှာပါ။</li>\n        <li>တနင်္ဂနွေသက်ရောက်မှာ မလိုအပ်ဘဲ ကြွားဝါတာမျိုး မလုပ်ပါနဲ့။ ဂုဏ်သတင်းက သူ့အလိုလို ကျော်ကြားနေပါလိမ့်မယ်။</li>\n        <li>ပတ်ဝန်းကျင်က လူတွေကို ယုံကြည်အားကိုးမှု မပြုပါနဲ့။</li>\n        <li>ဒီကာလဟာ အိမ်၊ မြေ၊ ခြံ၊ ကားတွေကို ပိုင်ဆိုင်နိုင်တဲ့ ဂြိုဟ်သက်ရောက် ဖြစ်တာကြောင့် ဉာဏ်နဲ့ဝီရိယကို အစွမ်းကုန်အသုံးချပြီး ကြိုးစားလုပ်ကိုင်မယ်ဆိုရင် ကြီးပွားအောင်မြင်မှုတွေ ရရှိမှာပါ။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">ဆိုးကျိုးကြုံတွေ့ရနိုင်သူများ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>မကောင်းတဲ့အပြုအမူများ</h4>\n            <ul>\n                <li>အခွင့်အရေးတွေကို အလွဲသုံးစားလုပ်တဲ့ ဘဝင်မြင့်၊ မာနကြီးသူတွေ။</li>\n                <li>လာဘ်ပေးလာဘ်ယူလုပ်တဲ့ ဝန်ထမ်းတွေဟာ ရာထူးကျတာ၊ အလုပ်ပြုတ်တာနဲ့ ထောင်ကျတာမျိုးတွေ ဖြစ်နိုင်ပါတယ်။</li>\n                <li>မတရားစီးပွားရှာသူ၊ ဝိသမလောဘသမားတွေဟာ ဘဝပျက်ပြီး ထောင်၊ ဆေးရုံ၊ သင်္ချိုင်း ရောက်တတ်ပါတယ်။</li>\n                <li>လောဘ၊ မာန၊ ဒေါသကြီးသူတွေဟာ အိမ်တွင်းရေး၊ အိမ်ထောင်ရေး ပြဿနာတွေ ဖြေရှင်းမရ ဖြစ်တတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အိုးပိုင်အိမ်ပိုင် ဖြစ်လိုရင်</h4>\n            <ul>\n                <li>သူတစ်ပါးရဲ့ အိမ်ထောင်ရေးကိစ္စတွေမှာ ဝင်ရောက်မစွက်ဖက်ပါနဲ့။</li>\n                <li>သူများရဲ့ အိမ်ထောင်ပရိဘောဂတွေ မိမိအိမ်မှာ ခေတ္တခဏ ထားတာမျိုး မလုပ်ပါနဲ့။</li>\n                <li>ရာဟုသက်ရောက်မှစပြီး ဒီကာလအထိ အိမ်ထောင်ရေးအရှုပ်အထွေးတွေကို မကူညီပါနဲ့။</li>\n                <li>မိမိသဘောနဲ့ အိမ်ခဏခဏ ပြောင်းတာ၊ ပြင်ဆင်တာမျိုး လုံးဝမလုပ်ပါနဲ့။</li>\n                <li>မိဘ၊ ယောက္ခမတွေနဲ့အတူနေရင် သီးခြားခွဲနေပါ။ ဒီကာလမှာ အိမ်ထောင်ရေး မရှုပ်ထွေးပါစေနဲ့။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">နေ့နံအလိုက် အထူးသိရန်</h2>\n    <ul>\n        <li><strong>တနင်္ဂနွေ၊ တနင်္လာ၊ သောကြာ၊ စနေ သားသမီးတွေ</strong>အတွက် ဒီကာလဟာ စီးပွားရေး၊ ပညာရေးနဲ့ အိမ်ထောင်ရေး အလွန်ကောင်းမွန်ပါတယ်။ တစ်ခုလပ်၊ မုဆိုးမတွေကို အိမ်ထောင်ပြုတာကလွဲပြီး အပျို၊ လူပျိုတွေအတွက်တော့ ရာသက်ပန် အိမ်ထောင်ရေး ကောင်းမွန်ပါလိမ့်မယ်။</li>\n        <li><strong>အင်္ဂါသားသမီးတွေ</strong>ဟာ အပြင်ရန် (ဦး-ညို) ကြုံရတတ်ပြီး အမှုအခင်းဖြစ်တာ၊ ခွဲစိတ်ရတာ၊ ဓားပြတိုက်ခံရတာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n        <li><strong>ဗုဒ္ဓဟူးသားသမီးတွေ</strong>ဟာ အတွင်းရန် (အင်းဝ) ကြုံရတတ်ပြီး အိမ်ထောင်ရေး ရှုပ်ထွေးတာ၊ လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ သဘောထားမတိုက်ဆိုင်တာမျိုး ဖြစ်နိုင်ပါတယ်။</li>\n        <li><strong>ကြာသပတေးသားသမီးတွေ</strong>ဟာ ဘုမ္မိကျရောက်ပြီး ကျန်းမာရေး ညံ့တတ်ပါတယ်။</li>\n    </ul>\n\n    ---\n\n    <h2 class=\"section-title\">မူလမဟာဘုတ် ၅ ကြွင်းများ</h2>\n    <p>၅ ကြွင်း မဟာဘုတ်ဖွားတွေဟာ ဒီကာလမှာ မရဏကြုံရတာကြောင့် အိမ်ထောင်ရေး ရုတ်တရက် ပြိုကွဲတာ၊ မိသားစုချင်း ပြဿနာဖြစ်တာ၊ အလုပ်ပြုတ်တာတွေ ကြုံရတတ်ပါတယ်။</p>\n    <div class=\"note\">\n        <p>အောက်ပါ ၅ ကြွင်းနေ့သားတွေဟာ မရဏနှစ်ထပ်ကျရောက်လို့ ပိုပြီး ဂရုစိုက်သင့်ပါတယ်။</p>\n        <ul>\n            <li>ကြာသပတေးသားသမီး (၅၅ နှစ်)</li>\n            <li>စနေသားသမီး (၆၁ နှစ်)</li>\n        </ul>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">ပဿံသာလောကဓံ (တနင်္ဂနွေသက်ရောက်) ယတြာ</h2>\n    <p>တနင်္ဂနွေသက်ရောက်ဟာ အိမ်ထောင်၊ အလုပ်၊ အလှူအတန်းတွေအတွက် ကောင်းတဲ့ကာလ ဖြစ်ပါတယ်။ ဒါပေမဲ့ မှန်ကန်တဲ့ အသက်မွေးဝမ်းကျောင်းမပြုသူတွေ၊ လောဘကြီးသူတွေနဲ့ မိုက်ရိုင်းသူတွေအတွက်တော့ ဆိုးကျိုးတွေ ပေါ်ပေါက်တတ်ပါတယ်။</p>\n    <p>မှန်ကန်စွာ နေထိုင်ပါလျက်နဲ့ ကြီးပွားအောင်မြင်မှု မရှိဘူးဆိုရင်တော့ အောက်ပါယတြာတွေကို ယုံယုံကြည်ကြည်နဲ့ လုပ်ဆောင်ကြည့်ပါဗျာ။</p>\n    <ul>\n        <li>ဘုရားထီးတင်ပွဲတွေနဲ့ ကြုံရင် ငွေလှူဒါန်းပါ။</li>\n        <li>သက်ကြီးဝါကြီးများ၊ မိဘ၊ ဆရာသမားများကို အဝတ်အထည်၊ မျက်နှာသုတ်ပဝါ စတာတွေ လှူဒါန်းပါ။</li>\n        <li>ဘုရားစေတီမှာ သန့်ရှင်းရေး မကြာခဏ လုပ်ပေးပါ။</li>\n        <li>ဘုရားကို ဆီမီးကပ်လှူပြီး ပတ်ဝန်းကျင်နဲ့ ခင်ခင်မင်မင် နေထိုင်ပါ။</li>\n        <li>ဘုရားနဲ့ ရဟန်းသံဃာတွေကို ဆွမ်းကပ်လှူပေးပါ။</li>\n        <li>ဘုရားမှာ တံခွန်၊ ကုက္ကားတွေ မကြာခဏ လှူပါ။</li>\n        <li>မုန့်လုံးရေပေါ်ကျွေးမွေးတာ၊ ဝေငှတာမျိုးလည်း ပြုလုပ်နိုင်ပါတယ်။</li>\n    </ul>\n    <p>ဒီလို ပြုလုပ်ခြင်းအားဖြင့် တနင်္ဂနွေသက်ရောက်ရဲ့ ကောင်းကျိုးတွေကို ပိုမိုခံစားရပြီး ဘေးဆိုးတွေကနေ ကင်းဝေးနိုင်မှာ ဖြစ်ပါတယ်။</p>\n\n</body>\n</html>\n\n";
				_loadLokadhamHtml();
			}
			else {
				if (_matchesLokadhamTitle("တနင်္လာ")) {
					html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>လာဘောလောကဓံ (ခေါ်) တနင်္လာသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">လာဘောလောကဓံ (ခေါ်) တနင်္လာသက်ရောက်</h1>\n\n    <div class=\"note\">\n        <p>တနင်္လာသက်ရောက်ကို လောကဓံ (၈) ပါးအရ <b>လာဘော</b>လို့ သတ်မှတ်ပါတယ်။ <b>လာဘော</b>ဆိုတာ လာဘ်ရခြင်း၊ ငွေ၊ အကြွားနဲ့ ဖြူစင်ခြင်းကို အဓိပ္ပာယ်ရပါတယ်။</p>\n        <p>တနင်္လာသက်ရောက်ဟာ လောကီဂြိုဟ်ကောင်း (၄) ခွင်ရဲ့ နောက်ဆုံးဖြစ်ပါတယ်။ လူတွေရဲ့ ကံနဲ့ လုံ့လဝီရိယအလိုက် ကောင်းကျိုးတွေကို နောက်ဆုံး ခံစားခွင့်ရှိတဲ့ ဂြိုဟ်တစ်လုံးဖြစ်ပါတယ်။ ဒီသက်ရောက်နှစ်မှာ ငွေစုဆောင်းရတာ လွယ်ကူပြီး ငွေအထုပ်အထည် ကြီးကြီးမားမား ဝင်တတ်ပါတယ်။ ဒါကြောင့် ဒီသက်ရောက်ကို <b>\"ငွေအထုပ်အထည်ဂြိုဟ်\"</b> လို့လည်း ခေါ်ကြပါတယ်။</p>\n        <p>ဒီဂြိုဟ်ဟာ အရေးကြီးပြီး သတိထားရမယ့် ဂြိုဟ်ဖြစ်ပါတယ်။ ဘာကြောင့်လဲဆိုတော့ တနင်္လာသက်ရောက်ကို ကျော်ဖြတ်ပြီးရင် လောကုတ္တရာဂြိုဟ်ဆိုးဖြစ်တဲ့ အင်္ဂါဂြိုဟ် (အယသော) ထဲကို ဝင်ရောက်ရမှာ ဖြစ်ပါတယ်။ ဒါကြောင့် ဒီကာလဟာ လာမယ့် ဆိုးကျိုးတွေကို ကြိုတင်ပြင်ဆင်ထားနိုင်တဲ့ အချိန်ကောင်းတစ်ခုပါပဲ။</p>\n        <p>ဒီကာလမှာ ခိုင်မာတဲ့ စီးပွားရေးလုပ်ငန်းတွေ တည်ဆောက်ထားသင့်ပြီး ရရန်ရှိတဲ့ကြွေးတွေလည်း အခုကတည်းက တောင်းခံစုဆောင်းထားသင့်ပါတယ်ခင်ဗျာ။</p>\n    </div>\n\n    <h2 class=\"section-title\">လာဘောဂြိုဟ်မှာ ရနိုင်တဲ့ ကောင်းကျိုးများ</h2>\n    <ul>\n        <li>ကိုယ်ကျင့်တရားကောင်းပြီး လုံ့လဝီရိယရှိသူတွေဟာ ငွေအစုလိုက်အပြုံလိုက် စုဆောင်းနိုင်ပါတယ်။</li>\n        <li>အမွေပစ္စည်း သို့မဟုတ် အကျိုးခံစားခွင့် ရတာမျိုးတွေ ဖြစ်နိုင်ပါတယ်။ (မှတ်ချက်။ ။ ၆ ကြွင်း မရဏ တနင်္လာနဲ့ ဗုဒ္ဓဟူးသားများအတွက်တော့ သေချာမှု နည်းပါးပါတယ်)</li>\n        <li>နှစ်ပေါင်းများစွာ ပျောက်ဆုံးနေတဲ့ ရတနာပစ္စည်းတွေ၊ ငွေတွေ မမျှော်လင့်ဘဲ ပြန်ရတတ်ပါတယ်။</li>\n        <li>ရွှေ၊ ငွေ၊ နဝရတ်စတဲ့ ရတနာတွေ ဝင်တတ်ပါတယ်။</li>\n    </ul>\n\n    <div class=\"note\">\n        <p>ကောင်းကျိုးတွေ ရရှိဖို့အတွက် အောက်ပါအချက်တွေကို ဂရုပြုရှောင်ကြဉ်သင့်ပါတယ်ဗျာ။</p>\n        <ul>\n            <li>မိမိပိုင်ဆိုင်မှုမရှိတဲ့ အဖွဲ့အစည်းပိုင်ငွေတွေကို ထိန်းသိမ်းတာ၊ လက်ခံတာမျိုး မလုပ်ပါနဲ့။</li>\n            <li>အဖိုးမတန်တဲ့ ကျောက်မျက်ရတနာအတုတွေကို မဝယ်ပါနဲ့၊ လက်ဆောင်ပေးရင်လည်း မယူပါနဲ့။</li>\n        </ul>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">ကြုံတွေ့နိုင်သည့် ဆိုးကျိုးများ</h2>\n    <ul>\n        <li>အတူနေ မိဘ၊ အဘိုးအဘွားတွေလို သက်ကြီးရွယ်အိုတွေ သေဆုံးရတတ်ပါတယ်။</li>\n        <li>ငွေကြေးပြဿနာကြောင့် အမှုအခင်းတွေ ဖြစ်တတ်ပါတယ်။</li>\n        <li>ကိုယ်ကျင့်တရားမကောင်းသူတွေ၊ ယုတ်မာကောက်ကျစ်သူတွေဟာ ဒီကာလမှာ အသေဆိုးနဲ့ သေဆုံးရတတ်ပါတယ်။ လာဘောသက်ရောက်ဟာ အလွန်ဖြူစင်တဲ့ဂြိုဟ်ဖြစ်လို့ မကောင်းသူတွေအတွက် အသေမြန်စေတတ်ပါတယ်ခင်ဗျာ။</li>\n    </ul>\n\n    <h2 class=\"section-title\">သတိပြုရန်</h2>\n    <p>တနင်္လာသက်ရောက်မှာ အောက်ပါပုဂ္ဂိုလ်တွေဟာ ဒုက္ခများစွာ ရောက်တတ်ပါတယ်။</p>\n    <ul>\n        <li>ကျောက်ကုန်သည်တွေနဲ့ ကျောက်တူးသမားတွေ ဒုက္ခရောက်ပြီး ကျောက်တူးရင်း သေဆုံးတတ်ပါတယ်။</li>\n        <li>မတရားစီးပွားရှာတဲ့ လောဘသမားတွေကို လာဘောဂြိုဟ်က ဖျက်ဆီးတတ်ပါတယ်။</li>\n        <li>ပန်းထိမ်နဲ့ ရွှေကုန်သည်တွေ အရှုံးပေါ်တတ်ပါတယ်။</li>\n    </ul>\n\n    <p class=\"note\">တောင့်တမှုနဲ့ ကြောင့်ကြမှုတွေ ကင်းမယ်ဆိုရင် လောကဓံ (၈) ခွင်လုံးမှာ စည်းစိမ်ချမ်းသာ ပြည့်ပြည့်ဝဝ ခံစားနိုင်မှာ ဖြစ်ပါတယ်ဗျာ။</p>\n\n    ---\n\n    <h2 class=\"section-title\">၆ ကြွင်းများ</h2>\n    <p>အထူးသဖြင့် ၆ ကြွင်းတွေဟာ ဒီလာဘောလောကဓံခွင်မှာ အလူးအလဲ ခံရတတ်ပါတယ်။</p>\n    <ul>\n        <li>အကုသိုလ်တွေဝင်၊ အလုပ်တွေပြုတ်ပြီး ငွေကြေးကိစ္စတွေ ရှုပ်ထွေးတတ်ပါတယ်။</li>\n        <li>ငွေအလိမ်ခံရတာ၊ အလျော်အစားပြဿနာတွေ ကြုံရတတ်ပါတယ်။</li>\n        <li>စီးပွားရေးလုပ်ငန်းတွေမှာ ငွေကြေးပြဿနာကြောင့် နာမည်ဂုဏ်သတင်း ကျဆင်းတတ်ပါတယ်။</li>\n        <li>လူယုံ သစ္စာရှိသူတွေကတောင် သစ္စာဖောက်တာ ခံရတတ်ပါတယ်။</li>\n        <li>ဘုမ္မိနဲ့ နှစ်ထပ်ကျရင်တော့ လင်သေ၊ မယားသေ၊ ရှင်ကွဲကွဲတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n    </ul>\n\n    <div class=\"note\">\n        <p>၆ ကြွင်းဖွားတွေထဲမှာ ဂြိုဟ်အိပ်ရော သက်ရောက်ပါ မရဏနှစ်ထပ်ကျတဲ့သူတွေကတော့-</p>\n        <ul>\n            <li>တနင်္လာသားသမီး - ၉ နှစ်</li>\n            <li>ကြာသပတေးသားသမီး - ၆၁၊ ၆၉ နှစ်</li>\n            <li>စနေသားသမီး - ၇၀၊ ၇၈ နှစ်</li>\n            <li>တနင်္ဂနွေသားသမီး - ၁၈ နှစ်</li>\n            <li>သောကြာသားသမီး - ၁၅၊ ၂၇ နှစ် တို့ ဖြစ်ပါတယ်။</li>\n        </ul>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">တနင်္လာသက်ရောက် တစ်နေ့ချင်းဟောကွက်</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>တနင်္ဂနွေ၊ တနင်္လာ၊ အင်္ဂါ၊ စနေ သားသမီး</h4>\n            <ul>\n                <li>စီးပွားရေး၊ လူမှုရေး၊ ပညာရေးနဲ့ အိမ်ထောင်ရေး ကောင်းမွန်ပါတယ်။</li>\n                <li>အလုပ်တွေ တိုးချဲ့လုပ်ကိုင်သင့်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ဗုဒ္ဓဟူး သားသမီး</h4>\n            <ul>\n                <li>(၇) ခွင်မြောက် ဘုမ္မိကျရောက်ပြီး အသက် (၄၇၊ ၅၅) နှစ်တွေမှာ ဘုမ္မိကြီးတည့်တည့်ကျလို့ ကျန်းမာရေး၊ စီးပွားရေး၊ လူမှုရေးကို အထူးဂရုစိုက်ရပါမယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ကြာသပတေး သားသမီး</h4>\n            <ul>\n                <li>ခေမာအပြင်ရန်ကျရောက်ပြီး အမှုအခင်းဖြစ်တာ၊ ခွဲစိတ်ကုသရတာ၊ ဓားပြတိုက်ခံရတာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>သောကြာ သားသမီး</h4>\n            <ul>\n                <li>သောကအတွင်းရန်ကျရောက်ပြီး လင်မယား၊ မိသားစုဝင်တွေနဲ့ ပြဿနာဖြစ်တတ်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">လာဘောလောကဓံ (တနင်္လာသက်ရောက်) ယတြာ</h2>\n    <p>တနင်္လာသက်ရောက်ဟာ ငွေကြေးအတွက် အကောင်းဆုံးကာလဖြစ်ပေမဲ့ အချို့သူတွေမှာ ငွေမဝင်ဘဲ လာဘ်ပိတ်နေတတ်ပါတယ်။ အဲဒီလိုအခက်အခဲတွေ ကြုံနေရပါက အောက်ပါယတြာတွေကို လုပ်ဆောင်နိုင်ပါတယ်ခင်ဗျာ။</p>\n    <ul>\n        <li>သိမ်၊ ကျောင်း၊ ဇရပ်တွေ ပြုပြင်တာ၊ လှူဒါန်းတာတွေ လုပ်ပါ။</li>\n        <li>သက်ကြီးဝါကြီးတွေနဲ့ ဘုန်းကြီးရဟန်းတွေကို ထီး၊ ဖိနပ်တွေ လှူဒါန်းပါ။</li>\n        <li>သက်သတ်လွတ်စားခြင်း၊ ဥပုသ်စောင့်ခြင်း၊ မွေးနေ့မှာ အလှူလုပ်တာတွေ ပြုလုပ်ပါ။</li>\n        <li>လာဘ်ပိတ်နေတယ်လို့ ခံစားရရင် မွေးနေ့မှာ ထီးဖြူ (၁၅) လက်နဲ့ ကနက္ကဒဏ် ထီးဖြူတစ်လက်၊ စုစုပေါင်း (၁၆) လက်ကို မွေးနံထောင့်မှာ နံနက် ၉:၄၀ အတွင်း အရှင်ကောဏ္ဍညရဟန္တာမထေရ်ကြီးကို ရည်မှန်းပြီး ပူဇော်ပေးပါ၊ စီးပွားရေး ကောင်းလာပါလိမ့်မယ်။</li>\n    </ul>\n\n</body>\n</html>\n";
					_loadLokadhamHtml();
				}
				else {
					if (_matchesLokadhamTitle("ဗုဒ္ဓဟူး")) {
						html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>ဗုဒ္ဓဟူးဂြိုဟ်သက်ရောက်ခြင်း (ဒုက္ခံလောကဓံ) အဟော</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"✅\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h3 class=\"main-title\">ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)အတွက်ဟောစာတမ်း</h3>\n\n    <p class=\"note\">\n        ဤဟောစာတမ်းသည် ဗေဒင်ပညာအရ ဗုဒ္ဓဟူးဂြိုဟ်သက်ရောက်ချိန်တွင် ဖြစ်ပေါ်လာနိုင်သည့် အခြေအနေများကို ဖော်ပြထားခြင်း ဖြစ်ပါသည်။\n    </p>\n\n    <h2>နိဒါန်း</h2>\n    <p>\n        အယသောလောကဓံ (အင်္ဂါသက်ရောက်) ကာလပြီးနောက် ရောက်ရှိလာတဲ့ ဒုက္ခံလောကဓံ (ဗုဒ္ဓဟူးသက်ရောက်) ဟာ လူရောစိတ်ပါ အလွန်အမင်းပင်ပန်းရတဲ့ ကာလတစ်ခု ဖြစ်ပါတယ်။ ယခင်နှစ်က စိတ်ပန်းခဲ့ရသမျှ ဒီနှစ်မှာ ရုပ်ပိုင်းဆိုင်ရာမှာပါ အတိုးချပြီး ပင်ပန်းလာပါလိမ့်မယ်။ အရင်နှစ်က ကြံစည်သမျှ အရာမထင်ခဲ့တာတွေကြောင့် စိတ်ထိခိုက်မှုတွေဟာ ရုပ်ပိုင်းဆိုင်ရာကိုပါ ထိခိုက်လာပြီး ကျန်းမာရေးပြဿနာပေါင်းစုံကို ရင်ဆိုင်ရပါလိမ့်မယ်။\n    </p>\n\n    <h2>ဒုက္ခံလောကဓံ၏ သဘောတရား</h2>\n    <p>\n        ဗုဒ္ဓဟူးဂြိုဟ်သက်ရောက်တဲ့ ဒီကာလမှာ သင့်ရဲ့ဘဝဟာ မတည်မငြိမ်၊ လှုပ်ရှားရုန်းကန်မှုတွေနဲ့ ပြည့်နှက်နေပါလိမ့်မယ်။ ကိုယ်ရောစိတ်ပါ အနားမရဘဲ စီးပွားရေး၊ အိမ်ထောင်ရေး၊ လူမှုရေး၊ ကျန်းမာရေး စတဲ့ ပြဿနာအမျိုးမျိုး ကြုံတွေ့ရနိုင်ပါတယ်။ ဒါ့ကြောင့် ဒီကာလကို <strong>\"လူပန်း၊ ရှုပ်ထွေးသောကာလ\"</strong> လို့ သတ်မှတ်ပါတယ်။ ယခင် အင်္ဂါသက်ရောက်ထက် ပိုမိုဆိုးရွားတဲ့ အခြေအနေတွေ၊ ရှုပ်ထွေးမှုတွေ ဝိုင်းဝိုင်းလည်နေတတ်ပါတယ်။\n    </p>\n\n    <h3 class=\"section-title\">ရုပ်ပိုင်းဆိုင်ရာ ထိခိုက်မှုများ</h3>\n    <ul>\n        <li>အမျိုးမျိုးသော ရုပ်ဥပဒ်ဘေးတွေ ကြုံတွေ့နိုင်ပါတယ်။</li>\n        <li>ဒုက္ခ၊သောကတွေကြောင့် စိတ်ညစ်ရုပ်ညှိုးဖြစ်ပြီး အသက်အရွယ်ထက် ပိုပြီး အိုစာနေတတ်ပါတယ်။</li>\n        <li>စားဝတ်နေရေးအတွက် အဆက်မပြတ် လှုပ်ရှားနေရတာကြောင့် ကိုယ့်ကိုယ်ကို ဂရုစိုက်ဖို့၊ သန့်သန့်ရှင်းရှင်း သပ်သပ်ရပ်ရပ်နေဖို့ အချိန်မရနိုင်ပါဘူး။</li>\n        <li>အကယ်၍ အလှအပပြင်ဆင်ပြီး သပ်ရပ်အောင်နေနိုင်ခဲ့ရင်တောင် အမည်မသိ၊ ရှာဖွေစမ်းသပ်မရတဲ့ ရောဂါမျိုးစုံ ခန္ဓာကိုယ်အနှံ့ ဝင်ရောက်နိုင်ပြီး \"မတ်တပ်ရောဂါ မပြတ်တမ်း\" ဖြစ်နေတတ်ပါတယ်။</li>\n    </ul>\n\n    <h3 class=\"section-title\">စိတ်ပိုင်းဆိုင်ရာ ထိခိုက်မှုများ</h3>\n    <ul>\n        <li>ဘာလုပ်လုပ် အရာမထင်တာကြောင့် ဒေါသတွေပိုပြီးကြီးလာမယ်။</li>\n        <li>အသုံးအစွဲ၊ စားသောက်နေထိုင်မှုတွေ ကျပ်တည်းလာတာကြောင့် လောဘစိတ်တွေပါ ပိုမိုအားကောင်းလာပါတယ်။</li>\n        <li>ရှိစုမဲ့စုတွေကို ပေါင်နှံပြီး ရင်းနှီးမြှုပ်နှံခဲ့ရင်တောင် လူသာပန်းပြီး ရှုံးတာနဲ့သာ ကြုံရပါလိမ့်မယ်။</li>\n        <li>ကိုယ်စိတ်ဆင်းရဲရတာတွေကြောင့် သူတစ်ပါးစားဝတ်နေထိုင်မှုတွေကို မြင်ပြီး အကြောင်းမဲ့ မနာလိုစိတ် (ဣဿာ) တွေ ဝင်လာတတ်ပါတယ်။</li>\n        <li>ဒီလို မနာလိုစိတ်နဲ့အတူ ဝန်တိုစိတ် (မစ္ဆရိယ) တွေပါ ပေါင်းစပ်လာတဲ့အခါ ငွေရဖို့အတွက် ကောင်းဆိုးမရွေး လုပ်မိပြီး အမှုအခင်းဖြစ်တာ၊ ထောင်ကျတာ၊ အသက်သေဆုံးတာမျိုးအထိ ဖြစ်နိုင်ပါတယ်။</li>\n    </ul>\n\n    <h3 class=\"section-title\">သတိပြုစရာများ</h3>\n    <p>\n        ဒီ ဗုဒ္ဓဟူးသက်ရောက်ကာလအတွင်း ချမ်းသာကြွယ်ဝလာတယ်ဆိုရင် နောက်လာမယ့် စနေသက်ရောက် (နိန္ဒာသက်ရောက်) မှာ အထူးသတိထားရပါမယ်။ သတိမထားရင် ရှိသမျှပစ္စည်းတွေ တက်တက်ပြောင်ပြီး လူအသက်သေဆုံးတဲ့အထိ ဖြစ်နိုင်ပါတယ်။ ဒီကာလမှာ ဒုက္ခရောက်နေသူအချင်းချင်းသာ ပိုပြီးတွေ့ဆုံရတတ်တဲ့အတွက် ဒုက္ခတွေပိုကြီးလာနိုင်ပါတယ်။ ဒါကြောင့် ကိုယ်၊ စိတ်၊ နှုတ် သုံးပါးကို အသိတရားက ဦးစီးပြီး ထိန်းသိမ်းနေထိုင်ဖို့ အလွန်အရေးကြီးပါတယ်။\n    </p>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>အိမ်ထောင်ရေးနှင့် လူမှုရေး</h4>\n            <ul>\n                <li>ဒီကာလမှာ အိမ်ထောင်ဖက်၊ ချစ်သူတွေဟာ တစ်ဦးနဲ့တစ်ဦး ကြင်နာဂရုစိုက်မှု မပေးနိုင်ဘဲ ပြဿနာတွေသာ ရှုပ်ထွေးနေတတ်ပါတယ်။</li>\n                <li>တစ်ဦးဦးက ကောင်းတဲ့ဂြိုဟ်သက်ရောက်နေချိန်မှာတောင် ဗုဒ္ဓဟူးသက်ရောက်နေတဲ့ အိမ်ထောင်ဖက်ရဲ့ ပြဿနာရှာမှုတွေကြောင့် သည်းမခံနိုင်ဘဲ နှစ်ဦးနှစ်ဖက် စိတ်ညစ်ရနိုင်ပါတယ်။</li>\n                <li>အစုအဖွဲ့နဲ့ နေထိုင်ရရင်လည်း ဘယ်သူမှ တစ်ဦးကိုတစ်ဦး ကူညီတာမျိုး မရှိဘဲ အဝင်အထွက်တွေသာ ရှုပ်ထွေးနေတတ်ပါတယ်။</li>\n                <li>အုပ်စုလိုက်နေထိုင်တဲ့အခါ တစ်ဦးကိုတစ်ဦး အကူအညီမပေးဘဲ ကိုယ့်ဒုက္ခနဲ့ကိုယ် ရှုပ်ထွေးနေတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>စီးပွားရေးနှင့် ငွေကြေး</h4>\n            <ul>\n                <li>ဘာစီးပွားရေးပဲ လုပ်လုပ် အမြတ်ရဖို့အသာထား၊ ရှုံးတာနဲ့သာ ကြုံရပါလိမ့်မယ်။</li>\n                <li>နေ့စဉ် စားဝတ်နေရေးအတွက် စိတ်ပူပန်ရတာကြောင့် စိတ်ထောင်းကိုယ်ကြေဖြစ်ပြီး ကျန်းမာရေးပါ ထိခိုက်နိုင်ပါတယ်။</li>\n                <li>ရှိတဲ့ပစ္စည်းတွေကို မတန်တဆဈေးနဲ့ ရောင်းချပေါင်နှံရတတ်ပါတယ်။</li>\n                <li>အိမ်ပိုင်ဖြစ်နေရင်တောင် အိမ်ရောင်းရတဲ့အထိ ဖြစ်နိုင်ပါတယ်။</li>\n                <li>ငွေလေးနည်းနည်းဝင်လာခဲ့ရင် အိမ်သားတွေထဲက တစ်ယောက်ပြီးတစ်ယောက် မကျန်းမမာဖြစ်တတ်ပါတယ်။</li>\n                <li>ငွေရင်းနှီးပြီးလုပ်တဲ့ လုပ်ငန်းအားလုံး ကျဆင်းဆုံးရှုံးနိုင်ပြီး လူလိမ်၊ လူကန်းတွေနဲ့ တွေ့ရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အခြားသော ပြဿနာများ</h4>\n            <ul>\n                <li>ငယ်ရွယ်သူတွေ အိမ်ပြေးဖြစ်တာ၊ အိမ်ထောင်ဖက်တွေ ကွဲကွာတာမျိုး ဖြစ်တတ်ပါတယ်။</li>\n                <li>ချစ်သူတွေ တစ်ဦးနဲ့တစ်ဦး အထင်အမြင်လွဲမှားပြီး ပြဿနာတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li>ဒီကာလမှာ သင့်ကို ကယ်တင်မယ့်သူ မတွေ့နိုင်ဘဲ သင့်လိုပဲ ကံဆိုးနေသူတွေနဲ့သာ တွေ့ဆုံရတတ်ပါတယ်။</li>\n                <li>အချစ်ရှာမိရင် ဒုက္ခရောက်တတ်ပါတယ်။ လှပတဲ့အမျိုးသမီးချောတွေနဲ့ တွေ့ရင် အပျိုမဟုတ်တဲ့ တစ်ခုလပ်၊ မုဆိုးမတွေနဲ့ တွေ့နိုင်ပြီး၊ ရုပ်ချောပြီး စကားကောင်းတဲ့ အမျိုးသားတွေနဲ့ တွေ့ရင်လည်း အလိမ်အညာသမားတွေ ဖြစ်နေတတ်ပါတယ်။</li>\n                <li>အိမ်ထောင်ဦးစီး ဗုဒ္ဓဟူးသက်ရောက်နေချိန်မှာ ငွေကြေးပြည့်စုံတဲ့ ဆွေမျိုးတွေ အိမ်ကို ရက်ကြာကြာ အလည်လာခဲ့ရင်တောင် ပြဿနာဖြစ်ပြီး အထင်သေးခံရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    <h3 class=\"section-title\">ဗုဒ္ဓဟူးသက်ရောက်သူအတွက် အဟော</h3>\n    <p>\n        ဗုဒ္ဓဟူးသက်ရောက်ခြင်းကို \"လူပန်းရှုပ်ထွေး\" လို့ အဓိပ္ပာယ်ဖွင့်ဆိုထားတဲ့အတိုင်း လုပ်သမျှ၊ ကြုံသမျှဟာ အဆင်မပြေမှုတွေနဲ့သာ ကြုံရပါလိမ့်မယ်။ ယခင် အင်္ဂါသက်ရောက်ကတည်းက ကံမကောင်းခဲ့ဘူးဆိုရင် ဒီဗုဒ္ဓဟူးသက်ရောက်ဟာ ပိုပြီးဒုက္ခရောက်နိုင်ပါတယ်။\n    </p>\n    <h4>စိတ်ပိုင်းဆိုင်ရာ</h4>\n    <ul>\n        <li>ကိုယ်၊ စိတ်၊ နှုတ် သုံးပါးလုံး ရှုပ်ထွေးနေပါလိမ့်မယ်။</li>\n        <li>အိမ်တွင်းရေး၊ မိသားစုကြောင့် စိတ်မချမ်းသာဘဲ စိတ်ရောလူပါ ပင်ပန်းမှုကြောင့် ရောဂါချူချာလာနိုင်ပါတယ်။</li>\n        <li>ပတ်ဝန်းကျင်က မိမိကို နှိမ့်ချတာ၊ ဝေဖန်တာ၊ သိက္ခာချတာမျိုးတွေလည်း ကြုံရတတ်ပါတယ်။</li>\n    </ul>\n    <h4>လူမှုရေးနှင့် စီးပွားရေး</h4>\n    <ul>\n        <li>နေထိုင်ရေး၊ စားရေးသောက်ရေးတွေ အဆင်မပြေဖြစ်ပြီး နေရပ်ပြောင်းရင်တောင် ပိုပြီး အဆင်မပြေတာ၊ အဖမ်းခံရတာတွေအထိ ဖြစ်နိုင်ပါတယ်။</li>\n        <li>ပြည်ပထွက်ဖို့ ကြိုးစားရင်လည်း ပွဲစားအလိမ်ခံရနိုင်ပြီး၊ ရောက်သွားခဲ့ရင်တောင် အလုပ်အဆင်မပြေတာ၊ ရစရာရှိတဲ့ ကြွေးတွေမရတာမျိုး ဖြစ်တတ်ပါတယ်။</li>\n    </ul>\n\n    <h3 class=\"section-title\">ခုနစ်ရက်သားသမီးများအလိုက် အဟော</h3>\n\n    <h4>တနင်္ဂနွေ၊ အင်္ဂါ၊ ဗုဒ္ဓဟူး၊ ကြာသပတေး သားသမီးများ</h4>\n    <p>\n        ဒီသားသမီးတွေဟာ မူလဗုဒ္ဓဟူးသက်ရောက်ရဲ့ ဆိုးကျိုးတွေအပြင်၊ ရန်၊ ဘုမ္မိတွေပါ ပူးတွဲနေတဲ့အတွက် ကံပိုပြီးဆိုးနိုင်ပါတယ်။\n    </p>\n    <h5>စီးပွားရေး</h5>\n    <ul>\n        <li>မမျှော်လင့်ဘဲ လုပ်ငန်းတွေ ရုတ်တရက် ပျက်စီးနိုင်တယ်။</li>\n        <li>လူလိမ်ခံရတာ၊ အချုပ်အနှောင်ခံရတာ၊ ဥပဒ်ဘေးကျရောက်ပြီး သေဆုံးတာမျိုးအထိ ဖြစ်နိုင်ပါတယ်။</li>\n    </ul>\n    <h5>လူမှုရေး</h5>\n    <ul>\n        <li>အတိုက်အခံတွေ ကြုံရမယ်။</li>\n        <li>ရာထူး၊ ဂုဏ်သိက္ခာတွေ ကျဆင်းနိုင်တယ်။</li>\n    </ul>\n    <h5>ပညာရေး</h5>\n    <ul>\n        <li>စိတ်မလေဖို့ အရေးကြီးပါတယ်။ မိဘဆရာသမားစကားကို နားထောင်ပြီး ကြိုးစားရင် အထူးအောင်မြင်နိုင်ပါတယ်။</li>\n        <li>မိဘဆရာသမားရဲ့ ထိန်းချုပ်မှုက အလွန်အရေးကြီးတဲ့ ကာလ ဖြစ်ပါတယ်။ လူမှုရေးနဲ့ စီးပွားရေးကလွဲပြီး ပညာရေးကတော့ ကောင်းမွန်ပါတယ်။</li>\n    </ul>\n    <h5>အချစ်ရေးနှင့် အိမ်ထောင်ရေး</h5>\n    <ul>\n        <li>ဒီကာလမှာ အိမ်ထောင်မပြုသင့်ပါဘူး။ အိမ်ထောင်ရေး မခိုင်မြဲ၊ အချစ်ရေး မတည်မြဲတတ်ပါဘူး။</li>\n        <li>အိမ်ထောင်သည်တွေ တစ်ဦးနဲ့တစ်ဦး နားလည်ခွင့်လွှတ်ဖို့ လိုအပ်ပါတယ်။</li>\n        <li>မိမိ အိမ်ထောင်ဖက်က ဗုဒ္ဓဟူးဒုက္ခံသက်ရောက်နေတယ်ဆိုရင် ကံဆိုးနေတယ်ဆိုတာကို နားလည်ပြီး အစစအရာရာ သည်းခံပေးသင့်ပါတယ်။</li>\n    </ul>\n    <h5>ကျန်းမာရေး</h5>\n    <ul>\n        <li>အလွန်ညံ့တဲ့အချိန် ဖြစ်ပြီး ရောဂါဖြစ်ရင် ပျောက်ဖို့ခက်ခဲပါတယ်။</li>\n        <li>တစ်ခါတစ်ရံ ခွဲစိတ်ရတဲ့အထိ အန္တရာယ်ကြုံနိုင်ပါတယ်။</li>\n    </ul>\n    <h5>အလုပ်အကိုင်</h5>\n    <ul>\n        <li>လက်ရှိအလုပ်ကိုသာ ဖြည်းဖြည်းချင်းလုပ်ပြီး လုပ်ငန်းတိုးချဲ့တာမျိုး မလုပ်ပါနဲ့။</li>\n        <li>အထက်က ဖိအားပေးတာ၊ အောက်က ဆန့်ကျင်တာမျိုး ကြုံရနိုင်ပါတယ်။ သည်းခံပြီးနေထိုင်ခြင်းဟာ အကောင်းဆုံး ယတြာပါပဲ။</li>\n    </ul>\n\n    <h4>တနင်္လာ၊ စနေ၊ သောကြာ သားသမီးများ</h4>\n    <p>\n        ဒီနေ့နံသားသမီးတွေဟာ ဗုဒ္ဓဟူးသက်ရောက်မှာ ရန်၊ ဘုမ္မိကင်းတဲ့အတွက် ဗုဒ္ဓဟူးသက်ရောက်ရဲ့ မူလဆိုးကျိုးတွေကိုသာ ခံစားရပါလိမ့်မယ်။\n    </p>\n    <h5>စီးပွားရေး</h5>\n    <ul>\n        <li>လုပ်ငန်းတိုးချဲ့ခြင်းမပြုသင့်ပါဘူး။ လက်ရှိအလုပ်ကိုပဲ ကြိတ်မှိတ်လုပ်ပါ။</li>\n        <li>အလုပ်မကောင်းလို့ ထွက်မယ်ဆိုရင် ပိုဆိုးသွားနိုင်ပါတယ်။</li>\n    </ul>\n    <h5>လူမှုရေး</h5>\n    <ul>\n        <li>စိတ်ထောင်းကိုယ်ကြေဖြစ်ရတတ်ပါတယ်။</li>\n        <li>တာဝန်ယူတာ၊ အာမခံတာမျိုးတွေ လုံးဝမလုပ်ပါနဲ့။</li>\n        <li>ကိုယ့်ကိုယ်ကိုယ်သာ အားကိုးပါ။ ကိုယ်ပြောဆိုလုပ်ကိုင်သမျှကို ပတ်ဝန်းကျင်က ဝေဖန်၊ ဆန့်ကျင်တာတွေ ကြုံရနိုင်ပါတယ်။</li>\n        <li>ဒီလိုဝေဖန်ခံရခြင်းကပင် ယတြာတစ်ခုဖြစ်တယ်လို့ သဘောထားပြီး စိတ်လျှော့ထားပါ။</li>\n    </ul>\n    <h5>ပညာရေး</h5>\n    <ul>\n        <li>စိတ်ပန်းလူပန်းခံနိုင်ရင် ပညာရေးမှာ အထူးအောင်မြင်နိုင်ပါတယ်။</li>\n    </ul>\n    <h5>အချစ်ရေးနှင့် အိမ်ထောင်ရေး</h5>\n    <ul>\n        <li>သည်းမခံနိုင်ရင် အိမ်ထောင်ရေး ကွဲတတ်ပါတယ်။ နားလည်မှုပေးမှ အဆင်ပြေပါလိမ့်မယ်။</li>\n        <li>တစ်ဦးနဲ့တစ်ဦး အထင်အမြင်လွဲမှားတာတွေလည်း ဖြစ်နိုင်ပါတယ်။</li>\n        <li>ဒုက္ခရောက်ချိန်မှာ ဘယ်သူမှ အကူအညီမပေးနိုင်ဘဲ နားလည်မှုလည်း မရှိတတ်ပါဘူး။ ဒီကာလမှာ ဒီလိုဖြစ်တတ်တယ်ဆိုတဲ့ စိတ်နဲ့သာ နေထိုင်သင့်ပါတယ်။</li>\n    </ul>\n    <h5>ကျန်းမာရေး</h5>\n    <ul>\n        <li>စိတ်ထောင်းလို့ ကိုယ်ကြေပြီး ရောဂါကြီးကြီးမားမား ဖြစ်တတ်ပါတယ်။</li>\n        <li>တစ်ခါတစ်ရံ ခွဲစိတ်ရတဲ့အထိ ဖြစ်နိုင်ပါတယ်။</li>\n    </ul>\n\n    <h3 class=\"section-title\">မဟာဘုတ် (၁) ကြွင်းဖွားများအတွက် အထူးသတိပြုရန်</h3>\n    <p>\n        မဟာဘုတ် (၁) ကြွင်းဖွားတွေအတွက် ဗုဒ္ဓဟူးသက်ရောက်ဟာ မရဏသက်ရောက် ဖြစ်နေတဲ့အတွက် အခြားအကြွင်းဖွားတွေထက် ပိုမိုခံရနိုင်ပါတယ်။\n    </p>\n    <h4>ကြုံတွေ့ရနိုင်သည့် အခက်အခဲများ</h4>\n    <ul>\n        <li>သူတစ်ပါးရဲ့ လက်ချက်နဲ့ သေဆုံးတာ၊ လုပ်ကြံခံရတာမျိုး ဖြစ်နိုင်ပါတယ်။</li>\n        <li>အတွင်းသိ၊ အပြင်သိ၊ ကိုယ့်လက်အောက်ကလူတွေရဲ့ ဆန့်ကျင်မှုကြောင့် ဒုက္ခရောက်တတ်ပါတယ်။</li>\n        <li>ပတ်ဝန်းကျင်ရဲ့ ဝိုင်းပယ်ခြင်း၊ အထင်မှားခြင်းတွေ ခံရနိုင်ပါတယ်။</li>\n        <li>နာတာရှည်ရောဂါဆိုးတစ်ခုခု စွဲကပ်တာမျိုး ဖြစ်နိုင်ပါတယ်။</li>\n    </ul>\n    <h4>မရဏနှစ်ထပ်ကျသော အသက်များ</h4>\n    <p>\n        ဂြိုဟ်အိပ်ရော၊ သက်ရောက်ပါ (၁) ကြွင်းဖွားတွေ ဗုဒ္ဓဟူးသက်ရောက် ဖြစ်ခဲ့ရင် မရဏနှစ်ထပ်ကျပြီး ပိုမိုဆိုးရွားနိုင်ပါတယ်။\n    </p>\n    <ul>\n        <li>တနင်္ဂနွေသား - ၃၆ နှစ်၊ ၄၄ နှစ်</li>\n        <li>တနင်္လာသား - ၂၀ နှစ်၊ ၂၇ နှစ်၊ ၃၅ နှစ်</li>\n        <li>အင်္ဂါသား - ၁၀ နှစ်၊ ၁၈ နှစ်</li>\n        <li>ဗုဒ္ဓဟူးသား - ၉ နှစ်</li>\n        <li>သောကြာသား - ၅၃ နှစ်၊ ၆၃ နှစ်</li>\n    </ul>\n\n    <h3 class=\"section-title\">ဒုက္ခံလောကဓံ (ဗုဒ္ဓဟူးသက်ရောက်) အတွက် ရှောင်ရန်/ဆောင်ရန်</h3>\n    <p>\n        ဒီကာလဟာ ကိုယ်တိုင်သာမက မိမိကြောင့် မိသားစုပါ ဆိုးကျိုးသက်ရောက်နိုင်တာကြောင့် <strong>\"ရေသာခိုစိတ်၊ အချောင်လိုက်ချင်စိတ်၊ အနိုင်ကျင့်လိုစိတ်\"</strong> တွေကို ဖျောက်ရပါမယ်။ မဂ္ဂင်ရှစ်ပါးထဲက <strong>\"သမ္မာသတိ\"</strong> အသိနဲ့ မှန်ကန်စွာ နေထိုင်ဖို့ အရေးကြီးပါတယ်။\n    </p>\n    <h4>ရှောင်ကြဉ်ရမည့် အရာများ</h4>\n    <ul>\n        <li>အိမ်ပြင်၊ အိမ်ဆောက်၊ အိမ်ပြောင်းရွှေ့ခြင်း မပြုပါနဲ့။ ပျက်နေရင် ဖာထေးပြီးသာ နေထိုင်ပါ။</li>\n        <li>ရွှေ၊ငွေ ပေါင်နှံ၊ ချေးငှား၊ အာမခံခြင်း လုံးဝမလုပ်ပါနဲ့။ ပေါင်ရင်ဆုံးရှုံးမယ်၊ အာမခံရင်လည်း စိုက်လျော်ရတတ်ပါတယ်။</li>\n        <li>စပ်တူစပ်ဖက် ရောင်းဝယ်ခြင်း၊ အကြီးအကျယ် ရင်းနှီးမြှုပ်နှံခြင်း ကို ရှောင်ပါ။ ပြဿနာတက်ပြီး အရှုံးနဲ့သာ ရင်ဆိုင်ရတတ်ပါတယ်။</li>\n        <li>အိမ်ထောင်ပရိဘောဂ၊ ဇိမ်ခံပစ္စည်း၊ တန်ဖိုးရှိ အဝတ်အထည်များ မဝယ်ပါနဲ့။ ဝယ်ရင် အလိမ်ခံရနိုင်ပါတယ်။</li>\n        <li>ဝတ်ကောင်းစားလှ ဝတ်ဆင်ခြင်း ကိုရှောင်ပါ။ ကျန်းမာရေးညံ့နိုင်ပါတယ်။</li>\n        <li>အကြီးအကဲတွေကို အထင်သေးခြင်း၊ ငယ်သူကို မထီမဲ့မြင်ပြုခြင်း ကို ရှောင်ပါ။ ပြဿနာဖြစ်ပြီး သိက္ခာကျနိုင်ပါတယ်။</li>\n        <li>ရပ်ဝေးနေ ဆွေမျိုးများထံ လည်ပတ်ခြင်း ကို ရှောင်ပါ။</li>\n        <li>ခရီးသွားခြင်း၊ ပြည်ပထွက်ပြီး အလုပ်ရှာခြင်း ကို ရှောင်ပါ။ ငွေကုန်ပြီး ဆုံးရှုံးတတ်ပါတယ်။</li>\n        <li>မည်သူနှင့်မျှ ယှဉ်ပြိုင်ခြင်း မပြုပါနဲ့။ သင်ဘယ်လောက်မှန်မှန် ရှုံးမှာပါပဲ။</li>\n        <li>ကြွေးပေးခြင်း၊ ကြွေးတောင်းခြင်း မလုပ်ပါနဲ့။ ပေးလိုက်ရင် ဆုံးရှုံးတတ်ပါတယ်။</li>\n        <li>အသင်းအဖွဲ့များတွင် ဦးဆောင်ခြင်း ကိုရှောင်ပြီး ငြိမ်ငြိမ်နေပါ။</li>\n        <li>ကြီးသူငယ်သူများအပေါ် ဆရာလုပ်၊ အာဏာပြခြင်း ကို ရှောင်ပါ။</li>\n    </ul>\n    <h4>ဆောင်ရွက်ရမည့် အရာများ</h4>\n    <ul>\n        <li>\"လူပန်းရှုပ်ထွေး၊ ဒုက္ခလောကဓံ\" ဆိုတဲ့အတိုင်း ဒုက္ခသည်တစ်ဦးလို စိတ်ထားပါ။ အများက အထင်သေးလည်း အထင်သေးပါစေ။</li>\n        <li>လူပင်ပန်းခံပြီး အလုပ်လုပ်ပါ။ လူပင်ပန်း၊ ဆင်းရဲခံမှ ဒုက္ခကြီးကြီးမားမားတွေက လွတ်မြောက်နိုင်ပါလိမ့်မယ်။</li>\n        <li>ငွေရဖို့ လောဘမတက်ပါနဲ့။ ငွေများများရဖို့ ကြိုးစားရင် အသက်အန္တရာယ်ထိ ဖြစ်နိုင်ပါတယ်။</li>\n        <li>ဇိမ်ခံတဲ့စိတ်နဲ့ အိပ်ရာကောင်းကောင်း မအိပ်ပါနဲ့။ ဖြစ်နိုင်ရင် ကြမ်းပြင်မှာသာ ဖြစ်သလိုအိပ်ပါ။</li>\n        <li>အိမ်ထောင်သည်များ ကာမဂုဏ်လျှော့ပါ။ အပျို၊ လူပျိုတွေ မရှုပ်ထွေးပါနဲ့။</li>\n        <li>တုပယှဉ်ပြိုင်၊ ကြွားဝါခြင်း တွေကို ရှောင်ပါ။</li>\n        <li>အလှမဆင်၊ မပြင်ပါနဲ့။ ဒါပေမယ့် ကိုယ်လက်သန့်ရှင်းအောင်တော့ နေထိုင်ပါ။</li>\n        <li>မဆိုင်တာတွေ ဝင်မပါပါနဲ့။ နှုတ်ပိတ်ပြီး အေးအေးဆေးဆေးနေပါ။</li>\n        <li>အစားကို ဇိမ်ခံမစားပါနဲ့။ အနေအထိုင်ကို ကြမ်းပြီး၊ အပြောအဆိုကို နှိမ့်ချပါ။</li>\n        <li>စိတ်ကို တည်ငြိမ်အောင်ထားပါ။</li>\n        <li>ဘုရားရေချမ်းကပ်တာ၊ သောက်ရေအိုးဖြည့်တာ၊ အိမ်သာသန့်ရှင်းရေးလုပ်တာ စတဲ့ အောက်ခြေသိမ်းအလုပ်တွေကို များများလုပ်ပါ။</li>\n    </ul>\n\n    <h3 class=\"section-title\">ယတြာများ</h3>\n    <p>\n        ဒီကာလရဲ့ ဆိုးကျိုးတွေကို သက်သာစေဖို့အတွက် အောက်ပါယတြာတွေကို လုပ်ဆောင်နိုင်ပါတယ်။\n    </p>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ယတြာများ</h4>\n            <ul>\n                <li>ဘုန်းကြီး (စိတ်ကို ထိန်းချုပ်နိုင်သူ၊ သီလရှိသူ) ကို အရုဏ်ဆွမ်း ကပ်လှူပါ။</li>\n                <li>ရုပ်ဒုက္ခရောက်နေသူ (ကျန်းမာရေးမကောင်းသူ) တွေကို တတ်နိုင်သမျှ ကူညီထောက်ပံ့ပေးပါ။</li>\n                <li>ရှစ်ရက်တစ်ကြိမ် သီတင်းနေ့များမှာ ဥပုသ်စောင့်၊ သက်သတ်လွတ်စားပြီး တရားဘာဝနာ ပွားများပါ။</li>\n                <li>ပတ်ဝန်းကျင်သန့်ရှင်းရေးလုပ်ပြီး ကိုယ်ပင်ပန်းခံပါ။</li>\n                <li>ရဟန်းသံဃာ၊ ဆရာသမား၊ မိဘများအား မကြာခဏ ရွှေရင်အေး ကပ်လှူပါ။</li>\n                <li>မွေးနေ့နံနက် ၉ နာရီမှ ၁၀ နာရီ ၃၀ မိနစ်အတွင်း တန်ခိုးကြီးဘုရားမျက်နှာတော်ကို ရွှေဆိုင်းတတ်နိုင်သမျှ ကပ်လှူပြီး အမွှေးနံ့သာနှင့် သန့်စင်ပေးပါ။</li>\n                <li>အရုဏ်တက်ချိန်တိုင်း မြတ်စွာဘုရားရှင်အား မျက်နှာသစ်ရေ အမြဲကပ်လှူပါ။</li>\n            </ul>\n        </div>\n    </div>\n    <p>\n        ဒီလို ယတြာတွေ ဆောင်ရွက်ခြင်းအားဖြင့် စိတ်ချမ်းသာ၊ လူချမ်းသာဖြစ်ပြီး ဗုဒ္ဓဟူးသက်ရောက်ရဲ့ ဆိုးကျိုးတွေ လျော့နည်းသွားပါလိမ့်မယ်။\n    </p>\n\n</body>\n</html>\n";
						_loadLokadhamHtml();
					}
					else {
						if (_matchesLokadhamTitle("စနေ")) {
							html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>နိဒ္ဒါလောကဓံ (ခေါ်) စနေသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">နိဒ္ဒါလောကဓံ (ခေါ်) စနေသက်ရောက်</h1>\n\n    <div class=\"note\">\n        <p>စနေသက်ရောက်ကာလမှာ လူတွေဟာ ပတ်ဝန်းကျင်ကလူတွေရဲ့ ကဲ့ရဲ့ပြစ်တင် ရှုတ်ချတာမျိုး ခံရတတ်ပါတယ်။ တစ်ခါတလေ သူတစ်ပါးရဲ့ တံတွေးခွက်မှာ ပက်လက်မျောနေရသလို ဘဝပျက်တဲ့အထိ ဒုက္ခမျိုးစုံ ကြုံတွေ့ရတတ်ပါတယ်။</p>\n        <p>ဒီကာလမှာ စီးပွားရေး၊ လူမှုရေးနဲ့ ကျန်းမာရေးတို့ဟာ အလွန်ကို ဆိုးရွားတတ်ပါတယ်။</p>\n        <ul>\n            <li>အမှုအခင်း ဖြစ်ရင် ထောင်ကျဖို့ သေချာပါတယ်။ ရှိသမျှ ဂုဏ်သိက္ခာတွေပါ ကျဆင်းတတ်ပါတယ်။</li>\n            <li>လာဘ်ပေးလာဘ်ယူ လုပ်တဲ့ ဝန်ထမ်းတွေဟာ အလုပ်ပြုတ်ပြီး ထောင်ကျတာမျိုး ဖြစ်နိုင်ပါတယ်။</li>\n            <li>ကိုယ်အင်္ဂါအစိတ်အပိုင်းတစ်ခုခု ပျက်စီးတာ၊ မီးလောင်တာ၊ အဆိပ်ရှိသတ္တဝါ အကိုက်ခံရတာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n            <li>ကျောင်းသားတွေ စာမေးပွဲကျတာ၊ ဘဝအခြေမကျတာတွေ ဖြစ်တတ်ပါတယ်။</li>\n            <li>အမျိုးသမီးတွေ သိက္ခာကျဆင်းတာ၊ ကိုယ်ဝန်ဆောင်တွေ မီးဖွားရခက်ခဲတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n            <li>လောဘသမားတွေ အထိနာပြီး ရှိသမျှပစ္စည်းတွေ ကုန်ဆုံးတတ်ပါတယ်။ ဘာလုပ်လုပ် အဆင်မပြေဖြစ်ပြီး ဒေါသတွေပါ ဖြစ်တတ်ပါတယ်ခင်ဗျာ။</li>\n        </ul>\n        <p>ဒီကာလဟာ အတိတ်နဲ့ ပစ္စုပ္ပန်မှာ လုပ်ခဲ့တဲ့ အကုသိုလ်တွေအတွက် အတိုးချပြီး ပြန်ပေးဆပ်ရတဲ့ ကာလတစ်ခု ဖြစ်ပါတယ်။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">စနေသက်ရောက်ရဲ့ ဆိုးကျိုးများ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ကိုယ်ရေးကိုယ်တာ</h4>\n            <ul>\n                <li>မျက်ရည်မစဲ ငိုရတတ်ပါတယ်။ ကိုယ်အင်္ဂါ ထိခိုက်ပျက်စီးတာ၊ သွေးထွက်သံယိုဖြစ်တာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n                <li>စီးပွားပျက်စီးပြီး လက်ကျန်တွေပါ ကုန်သွားတတ်ပါတယ်။</li>\n                <li>အိမ်ထောင်ဦးစီး စနေသက်ရောက်ဖြစ်နေရင် သက်ကြီးရွယ်အိုတွေရဲ့ အသက်အန္တရာယ်ကို စိုးရိမ်ရပါတယ်။</li>\n                <li>အိမ်မွေးတိရစ္ဆာန်တွေ သေတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အိမ်ထောင်ရေး</h4>\n            <ul>\n                <li>အိမ်ထောင်ပြုဖို့ မသင့်တဲ့ကာလ ဖြစ်ပါတယ်။ ဒီကာလမှာ အိမ်ထောင်ပြုရင် မိဘဆွေမျိုးတွေနဲ့ စိတ်ဝမ်းကွဲတာ၊ သေခန်းပြတ်တာတွေ ဖြစ်တတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အထူးသတိပြုရန်</h4>\n            <ul>\n                <li>၄ ကြွင်း မဟာဘုတ်သမားတွေဟာ ရုတ်တရက် သေဆုံးတာ၊ လုပ်ကြံခံရတာ၊ ရောဂါရတာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n                <li>စနေသက်ရောက် နှစ်ထပ်ကျသူတွေဟာ ပိုဆိုးရွားပြီး အိမ်မီးလောင်တာ၊ ဓာတ်လိုက်တာ၊ အပူလောင်တာမျိုးတွေ ဖြစ်တတ်ပါတယ်။ ဒီလိုကာလမှာ ဘာမှ မလုပ်ဘဲ အိမ်ထဲမှာ အေးအေးဆေးဆေး နေထိုင်တာ အကောင်းဆုံးပါပဲခင်ဗျာ။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">စနေသက်ရောက် (နိဒ္ဒါလောကဓံ) ဟောချက်များ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>၁။ တနင်္ဂနွေ၊ အင်္ဂါ၊ ဗုဒ္ဓဟူး၊ စနေ သားသမီးများ</h4>\n            <ul>\n                <li><strong>လူမှုရေး</strong> - ရာထူးကျတာ၊ ဂုဏ်သိက္ခာကျတာတွေ ဖြစ်နိုင်ပါတယ်။ တာဝန်ကြီးကြီးယူရလေ၊ စိတ်ညစ်ရလေ ဖြစ်ပါတယ်။ ဒါကြောင့် ဘာပဲဆုံးဖြတ်ဆုံးဖြတ် အလျင်စလို မဆုံးဖြတ်ဘဲ ပုတ်သင်ညိုလို နေထိုင်သင့်ပါတယ်။</li>\n                <li><strong>စီးပွားရေး</strong> - လုပ်ငန်းတွေ ရပ်ဆိုင်းပျက်စီးတတ်ပါတယ်။ လူတွေကို မယုံပါနဲ့၊ အလွယ်တကူ အညာခံရတတ်ပါတယ်။ လက်ရှိလုပ်ငန်းကိုပဲ သည်းခံပြီး လုပ်ကိုင်ပါခင်ဗျာ။</li>\n                <li><strong>ပညာရေး</strong> - ကောင်းမွန်ပါတယ်။ ကြိုးစားရင် သေချာပေါက် အောင်မြင်ပါတယ်။</li>\n                <li><strong>အိမ်ထောင်ရေး</strong> - သည်းခံမှုနဲ့ နားလည်မှုဟာ အဓိကပါ။ ဒီကာလဟာ သာယာတဲ့အချိန် မဟုတ်ပါဘူး။ အချင်းချင်း နားလည်မှုရှိရင်တော့ အဆိုးတွေကို အတူတူရင်ဆိုင်ကျော်လွှားနိုင်ပါလိမ့်မယ်။</li>\n                <li><strong>အချစ်ရေး</strong> - ပြဿနာမျိုးစုံ ဖြစ်နိုင်ပါတယ်။ အပျော်အပါးတွေကြောင့် ရန်ဖြစ်တာ၊ အလုပ်လက်မဲ့ဖြစ်တာမျိုးတွေ ကြုံရတတ်ပါတယ်။ ပင်ပင်ပန်းပန်း ရုန်းကန်နေရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>၂။ တနင်္လာ၊ ကြာသပတေး၊ သောကြာ သားသမီးများ</h4>\n            <p>ဒီသားသမီးတွေကတော့ စနေသက်ရောက်မှာ တခြားနေ့သားသမီးတွေထက် ပိုဆိုး၊ ပိုခံရပါတယ်။</p>\n            <ul>\n                <li><strong>တနင်္လာသားသမီး</strong> - စနေခွင်ဟာ လေးခွင်မြောက် ဘုမ္မိဖြစ်ပြီး ကျန်းမာရေးညံ့တတ်ပါတယ်။</li>\n                <li><strong>ကြာသပတေးသားသမီး</strong> - ဓမ္မာ အတွင်းရန်ကျရောက်ပြီး မိသားစုနဲ့ ပြဿနာဖြစ်တာ၊ လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ အဆင်မပြေတာတွေ ကြုံရတတ်ပါတယ်။</li>\n                <li><strong>သောကြာသားသမီး</strong> - သုတ အပြင်ရန်ဖြစ်ပြီး ခါးပိုက်နှိုက်ခံရတာ၊ ဓားပြတိုက်ခံရတာ၊ ခွဲစိတ်ကုသရတာတွေ ဖြစ်တတ်ပါတယ်။</li>\n            </ul>\n            <p>ဒီသုံးနေ့သားသမီးတွေဟာ အလုပ်အကိုင်၊ စီးပွားရေး၊ လူမှုရေး၊ အိမ်ထောင်ရေး၊ အချစ်ရေးနဲ့ ကျန်းမာရေးတို့မှာ အခြားသူတွေထက် ပိုမိုဆိုးရွားစွာ ကြုံတွေ့ခံစားရတတ်ပါတယ်ခင်ဗျာ။</p>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">နိဒ္ဒါလောကဓံ (စနေသက်ရောက်) ယတြာ</h2>\n    <p>စနေသက်ရောက်ဟာ ရုပ်ပိုင်းဆိုင်ရာ၊ စိတ်ပိုင်းဆိုင်ရာနဲ့ ကျန်းမာရေးတွေ ညံ့ဖျင်းတဲ့ ကာလဖြစ်ပါတယ်။ ဒီကာလမှာ အဓိက လိုက်နာရမယ့်အချက်ကတော့ အရာရာကို ခွင့်လွှတ်ပြီး သည်းခံနေထိုင်တာပါပဲ။</p>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ပြုလုပ်သင့်သည့် ယတြာများ</h4>\n            <ul>\n                <li>သတ္တဝါသတ်တဲ့အလုပ် လုံးဝမလုပ်ပါနဲ့။ ငါးလွှတ်တာ၊ သေလုနီးနီး ကြက်တွေကို အသက်ကယ်တာမျိုး လုပ်ပါ။</li>\n                <li>ကျန်းမာရေးညံ့သူတွေကို ဆေးဝါးလှူဒါန်းပေးပါ။</li>\n                <li>မွေးနေ့တိုင်း ဘုရားရဲ့စနေထောင့်မှာ ဆီမီး၊ ထီး၊ တံခွန်တွေ ပူဇော်ပေးပါ။</li>\n                <li>အသားမစားဘဲ သက်သတ်လွတ်စားတာ၊ လမ်းဘေးအမှိုက်တွေ လှည်းပေးတာ၊ အိမ်သာဆေးတာမျိုးတွေ လုပ်ပါ။</li>\n                <li>ဆရာသမားတွေ၊ မိဘတွေနဲ့ ရဟန်းသံဃာတွေကို ပန်ကာ၊ နာရီလို အမြဲလှုပ်ရှားနေတဲ့ ပစ္စည်းတွေ လှူဒါန်းပေးပါ။</li>\n                <li>ရွှေရင်အေး၊ အဖျော်ယမကာတွေ လှူဒါန်းပါ။</li>\n                <li>ဂုဏ်တော်ကိုးပါး ဒါမှမဟုတ် အရဟံဂုဏ်တော်ကို ၁၀၈ ပတ်ပုတီးစိပ်ပေးပါ။</li>\n            </ul>\n        </div>\n    </div>\n    <p>ဒီလို ပြုလုပ်ခြင်းအားဖြင့် စနေသက်ရောက်ရဲ့ ဆိုးကျိုးတွေကနေ ကင်းဝေးပြီး စိတ်ချမ်းသာမှု ရရှိနိုင်မှာပါခင်ဗျာ။</p>\n\n</body>\n</html>\n";
							_loadLokadhamHtml();
						}
						else {
							if (_matchesLokadhamTitle("ကြာသပတေး")) {
								html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>အလာဘောလောကဓံ (ခေါ်) ကြာသပတေးသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">အလာဘောလောကဓံ (ခေါ်) ကြာသပတေးသက်ရောက်</h1>\n\n    <div class=\"note\">\n        <p>ကြာသပတေးသက်ရောက် (အလာဘော) ဟာ ပညာ၊ အတွေးအခေါ်၊ ပျော်ရွှင်ခြင်းနဲ့ လွတ်လပ်ခြင်းကို အဓိပ္ပာယ်ရပါတယ်။ ဒါဟာ လောကုတ္တရာအဆိုးလေးခွင်ရဲ့ နောက်ဆုံးပိတ်ဂြိုဟ်ဖြစ်ပြီး မိမိတို့လုပ်ခဲ့တဲ့ ကုသိုလ်၊ အကုသိုလ်တွေရဲ့ နောက်ဆုံးအကျိုးပေးရာ ဂြိုဟ်လည်း ဖြစ်ပါတယ်ခင်ဗျာ။</p>\n        <p>ဒီကာလမှာ ကိုယ်ကျင့်တရားမကောင်းတဲ့သူတွေအတွက် အမှန်တရားက မီးမောင်းထိုးပြီး မြင်သာထင်သာအောင် ပြပေးတတ်ပါတယ်။ ပြီးခဲ့တဲ့ အင်္ဂါ၊ ဗုဒ္ဓဟူးနဲ့ စနေသက်ရောက်တွေရဲ့ အကုသိုလ်ကြွေးကျန်တွေရှိရင် ဒီကာလမှာ အသက်၊ ဂုဏ်သိက္ခာ၊ စည်းစိမ်ဥစ္စာတွေနဲ့ ဘဝကို ပေးဆပ်ရတတ်ပါတယ်။ ဒါကြောင့် အလာဘောဟာ ဉာဏ်ဂြိုဟ်မဟုတ်ဘဲ ကံဂြိုဟ် ဖြစ်လို့ ကံ၊ ကံရဲ့အကျိုးပေးကိုပဲ ခံစားရမှာ ဖြစ်ပါတယ်။</p>\n        <p>ဒါပေမဲ့ ကိုယ်ကျင့်တရားဖြူစင်တဲ့သူတွေ၊ လောဘ၊ ဒေါသ၊ မောဟနည်းသူတွေအတွက်တော့ ဒီကာလဟာ လာဘ်မရတဲ့ကာလ မဟုတ်ပါဘူး။ ငွေရတာ၊ ရာထူးတိုးတာနဲ့ ကောင်းကျိုးတွေပဲ ကြုံရတတ်ပါတယ်ခင်ဗျာ။ ဒါကြောင့် အဝိဇ္ဇာ (အသိပညာမရှိခြင်း) နဲ့ နေထိုင်သူတွေဟာ ဒုက္ခမျိုးစုံနဲ့ ကြုံရပေမဲ့ ဝိဇ္ဇာ (အသိရှိခြင်း) နဲ့ နေထိုင်သူတွေအတွက်တော့ ပညာအမျိုးမျိုး၊ အသိတရားအမျိုးမျိုး ရနိုင်တဲ့ကာလ ဖြစ်ပါတယ်ခင်ဗျာ။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">အလာဘော (ကြာသပတေးသက်ရောက်) ရဲ့ သဘောသဘာဝ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>အထွေထွေ</h4>\n            <ul>\n                <li>ဘာဆိုဘာမှ ပြတ်ပြတ်သားသား လုပ်လို့မရဘဲ အကောင်းလည်းမဟုတ်၊ အဆိုးလည်းမဟုတ်ဘဲ ယောင်လည်လည်၊ အူချာချာ ဖြစ်နေတတ်ပါတယ်။ စိတ်ကူးတွေသာ ရှိပြီး အကောင်အထည်ဖော်လို့ မရတတ်ပါဘူး။</li>\n                <li>ကိုယ်ဝန်ဆောင်အမျိုးသမီးများ အထူးသတိပြုရမယ့် ကာလ ဖြစ်ပါတယ်။ မီးဖွားရခက်ခဲတာ၊ အခန့်မသင့်ရင် အသက်ပါ ဆုံးရှုံးနိုင်တာမျိုး ဖြစ်တတ်ပါတယ်။</li>\n                <li>စီးပွားရေးလုပ်ငန်းရှင်များဟာ လက်ရှိလုပ်ငန်းကနေ လုပ်ငန်းအသစ် ပြောင်းချင်တဲ့စိတ်တွေ ပေါ်လာတတ်ပါတယ်။ ဒါပေမဲ့ ဒီစိတ်နဲ့ လုပ်ဆောင်မိရင် ရှိသမျှပစ္စည်းတွေပါ ဆုံးရှုံးပြီး အိုးမဲ့အိမ်မဲ့ ဖြစ်သွားတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>နေ့သားအလိုက်</h4>\n            <ul>\n                <li><strong>အမျိုးသားများ</strong> - အိမ်မှာ ကိုယ်ဝန်ဆောင်ရှိရင် စီးပွားရေးတွေ ရပ်ဆိုင်းတာမျိုး ဖြစ်တတ်ပါတယ်။ ကိုယ်ဝန်ဆောင်မရှိရင်လည်း ဂုဏ်သိက္ခာကျတဲ့ ပြဿနာတွေ၊ အမှုအခင်းတွေ ကြုံရတတ်ပါတယ်။</li>\n                <li><strong>အမျိုးသမီးများ</strong> - စနေသက်ရောက်တုန်းက လော်မာခဲ့တာတွေရှိရင် ဒီကာလမှာ အားလုံးပေါ်ပြီး အရှက်ကွဲတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">အလာဘောလောကဓံရဲ့ ဘေးဆိုးများမှ လွတ်မြောက်လိုလျှင်</h2>\n    <ul>\n        <li>ဉာဏ်မသုံးပါနဲ့။ သူ့သဘောသူဆောင်နေတာမို့ လိုက်လျောညီထွေ နေထိုင်ပေးပါ။ ဉာဏ်ကူပြီးလုပ်မှ ဒုက္ခတွေ့တတ်ပါတယ်။</li>\n        <li>အရင်လုပ်ခဲ့တဲ့အလုပ်တွေကိုပဲ ဆက်လုပ်ပါ။ မတိုးချဲ့ပါနဲ့၊ မပြောင်းလဲပါနဲ့။</li>\n        <li>အိမ်ရောင်းတာ၊ အိမ်ပေါင်တာမျိုး မလုပ်ပါနဲ့။</li>\n        <li>ပြီးခဲ့တဲ့နှစ်တွေက မပြေလည်တဲ့အမှုတွေ၊ အမွေမှုတွေကို ဒီကာလမှာ မရှင်းပါနဲ့။ သည်းခံပြီး အတတ်နိုင်ဆုံး အချိန်ဆွဲထားပါ။ မဖြစ်မနေရှင်းရမယ်ဆိုရင် အရှုံးပေးလိုက်ပါ။</li>\n        <li>အိမ်အပြောင်းအရွှေ့နဲ့ အလုပ်အပြောင်းအရွှေ့တွေကို မလုပ်ပါနဲ့။</li>\n    </ul>\n\n    <p class=\"note\">ဒီလို သတိထားနေထိုင်ပြီး ကြာသပတေးသက်ရောက်ရဲ့ နောက်ပိုင်းကာလတွေကို အကောင်းဆုံး ကျော်လွှားနိုင်မယ်ဆိုရင် ရှေ့ဆက်လာမယ့် ရာဟုသက်ရောက်ကာလမှာ လုပ်ငန်းတွေ တိုးတက်တာ၊ အိမ်ရတာ၊ ကားရတာ၊ လူတွေရဲ့ ချစ်ခင်ယုံကြည်မှု ရတာစတဲ့ ကောင်းကျိုးတွေ အများကြီး ရရှိမှာပါခင်ဗျာ။</p>\n\n    ---\n\n    <h2 class=\"section-title\">ကြာသပတေးသက်ရောက် ခုနစ်ရက်သားသမီး ဟောချက်</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>၁။ တနင်္ဂနွေ၊ ဗုဒ္ဓဟူး၊ ကြာသပတေး သားသမီးများ</h4>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - အဆိုးမှ လွတ်မြောက်ခါစမို့ ပြန်လည်တည်ထောင်ရမယ့် ကာလ ဖြစ်ပါတယ်။ လောဘမကြီးဘဲ ဖြည်းဖြည်းမှန်မှန်လုပ်ဆောင်ရင် တိုးတက်လာပါလိမ့်မယ်။</li>\n                <li><strong>လူမှုရေး</strong> - အိမ်ကိစ္စ၊ မြေကိစ္စနဲ့ အမွေကိစ္စတွေမှာ အရှုပ်အရှင်းပေါ်တတ်ပါတယ်။ ဒီကာလမှာ မရှင်းဘဲ သည်းခံနေသင့်ပါတယ်။</li>\n                <li><strong>ပညာရေး</strong> - ကောင်းမွန်ပါတယ်။ ဇွဲ၊ လုံ့လ၊ ဝီရိယနဲ့ ကြိုးစားရင် ထူးချွန်စွာ အောင်မြင်နိုင်ပါတယ်ဗျ။</li>\n                <li><strong>အိမ်ထောင်ရေး၊ အချစ်ရေး</strong> - အချစ်ရေးက ပြန်ကောင်းစပြုလာပြီမို့ အိမ်ထောင်ပြုရင် ပြုနိုင်ပါတယ်။ ဒီကာလမှာ အချစ်စစ်၊ အချစ်မှန် တွေ့ရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>၂။ တနင်္လာ၊ သောကြာ၊ အင်္ဂါ၊ စနေ သားသမီးများ</h4>\n            <p>ဒီသားသမီးတွေကတော့ ကြာသပတေးသက်ရောက်နဲ့ ရန်တွေ၊ ဘုမ္မိတွေ ကြုံရတာကြောင့် အဆိုးကာလတွေ ဖြစ်ပါတယ်။</p>\n            <ul>\n                <li><strong>တနင်္လာသားသမီး</strong> - ခေမာ အပြင်ရန်ကျရောက်ပြီး မိတ်ဆွေနဲ့ ပြဿနာဖြစ်တာ၊ ကားတိုက်တာ၊ ခါးပိုက်နှိုက်ခံရတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>စနေသားသမီး</strong> - ဓမ္မာ အတွင်းရန်ကျရောက်ပြီး မိသားစုနဲ့ ပြဿနာဖြစ်တာ၊ ကိုယ်တွင်းရောဂါတွေ ဖြစ်တာ၊ အိမ်ထောင်ရေး ရှုပ်ထွေးတာတွေ ကြုံရတတ်ပါတယ်။</li>\n                <li><strong>အင်္ဂါသားသမီး</strong> - လေးခွင်မြောက် ဘုမ္မိကျရောက်ပြီး ကျန်းမာရေးချို့တဲ့တာ၊ ရောဂါရှာမရတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>သောကြာသားသမီး</strong> - ခုနစ်ခွင်မြောက် ဘုမ္မိလေးဖြစ်ပြီး ရုပ်ပိုင်း၊ စိတ်ပိုင်းဆိုင်ရာ ရောဂါတွေ ဖြစ်တတ်ပါတယ်ဗျာ။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">၂ ကြွင်း မဟာဘုတ်နဲ့ အလာဘောသက်ရောက်</h2>\n    <p>၂ ကြွင်းမဟာဘုတ်တွေဟာ ကြာသပတေးသက်ရောက်မှာ မရဏဖြစ်ပါတယ်။ ဒီသက်ရောက်မှာ တစ်ယူသန်အတွေးအခေါ်တွေကြောင့် စီးပွားရေးဆုံးရှုံးတာ၊ အမွေမှုတွေ ကြုံရတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။ အင်္ဂါနဲ့ သောကြာသားသမီးတွေဟာ ရောဂါဖြင့် သေဆုံးတတ်ပြီး စနေနဲ့ အင်္ဂါသားသမီးတွေဟာ ထောင်ကျတာ၊ အိမ်ထောင်ကွဲတာတွေ ဖြစ်နိုင်ပါတယ်ဗျာ။</p>\n    <div class=\"note\">\n        <p>၂ ကြွင်းတွေထဲမှာ ဂြိုဟ်အိပ်ရော သက်ရောက်ပါ နှစ်ထပ်ကျတဲ့သူတွေကတော့ အသက် (၉၊ ၁၇၊ ၂၇၊ ၃၅၊ ၃၆၊ ၄၃၊ ၄၄၊ ၅၂၊ ၅၃၊ ၆၁၊ ၆၂၊ ၆၉၊ ၇၀၊ ၇၉၊ ၈၇) နှစ်တွေ ဖြစ်ပါတယ်။ ဒီလိုကာလမှာ မမျှော်လင့်ဘဲ ငွေဝင်တာမျိုး ဖြစ်ရင်တောင် အိမ်မှာ အသုဘရှိတတ်ပါတယ်။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">အလာဘောလောကဓံ (ကြာသပတေးသက်ရောက်) ယတြာ</h2>\n    <p>ဒီကာလဟာ ငွေမဝင်ဘဲ လာဘ်ပိတ်တဲ့ကာလ ဖြစ်တာကြောင့် သီလစောင့်ထိန်းခြင်း၊ ရောင့်ရဲတင်းတိမ်ခြင်းနဲ့ ခွင့်လွှတ်ခြင်းဟာ အကောင်းဆုံး ယတြာတွေပါပဲ။</p>\n    <ul>\n        <li>ဘုရားကို ပန်းမွေ့ရာခင်းလှူဒါန်းပြီး ပေါက်ပေါက်ဆုပ်လှူပါ။</li>\n        <li>ရေအိုးစင်တွေ ရေဖြည့်ပေးပါ။</li>\n        <li>မသန်စွမ်းဒုက္ခိတတွေနဲ့ ကိုယ်ဝန်ဆောင်မိခင်တွေကို ဆေးဝါးနဲ့ လိုအပ်တဲ့ ပစ္စည်းတွေ ကူညီလှူဒါန်းပါ။</li>\n        <li>ခွေးလေခွေးလွင့်တွေကို အစာကျွေးပါ။</li>\n        <li>မုန့်လုံးရေပေါ်လှူဒါန်းတာမျိုးတွေလည်း လုပ်နိုင်ပါတယ်ခင်ဗျာ။</li>\n    </ul>\n    <p>ဒီလို ယတြာတွေ လုပ်ဆောင်ခြင်းအားဖြင့် ဒုက္ခတွေနဲ့ ငွေကြေးအခက်အခဲတွေ ၈၀% လောက် လျော့ပါးသွားနိုင်ပါတယ်။</p>\n\n</body>\n</html>\n";
								_loadLokadhamHtml();
							}
							else {
								if (_matchesLokadhamTitle("ရာဟု")) {
									html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>ယသောလောကဓံ (ခေါ်) ရာဟုသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">ယသောလောကဓံ (ခေါ်) ရာဟုသက်ရောက်</h1>\n\n    <div class=\"note\">\n        <p>ရာဟုဂြိုဟ်ဟာ လေဂြိုဟ်ဖြစ်ပြီး ပျော်ရွှင်ခြင်း၊ အိမ်ထောင်ရှုပ်ထွေးခြင်း၊ စန်းပွင့်ခြင်း၊ စီးပွားရေးကောင်းခြင်းနဲ့ အခြွေအရံများခြင်းတို့ကို ဖြစ်စေတတ်ပါတယ်။</p>\n        <p>ရာဟုဟာ ရွှေဂြိုဟ် ဖြစ်လို့ ရွှေဝင်တာ၊ ရွှေရတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။ ရေနဲ့လေဂြိုဟ်ဖြစ်တာကြောင့် ရေဘေး၊ လေဘေးတွေလည်း ကြုံရတတ်ပါတယ်။ ဒီကာလမှာ ကိုယ်၊ စိတ်၊ နှုတ်ကို ထိန်းသိမ်းနိုင်တဲ့သူတွေဟာ တန်ဖိုးကြီးတဲ့ဘဝကို ရောက်နိုင်ပေမဲ့ မထိန်းသိမ်းနိုင်ရင်တော့ ရွှံ့နွံဘဝကို ရောက်တတ်ကြပါတယ်။</p>\n        <p>ဒီကာလမှာ လူတွေဟာ အလိုလိုနေရင်း လှပလာပြီး အပေါင်းအသင်းတွေ များလာတတ်ပါတယ်။ လူတွေရဲ့ အထင်ကြီးခံရပြီး မျက်နှာပွင့်လန်းလာတတ်ပါတယ်။ ရာဟုကာလရဲ့သဘောသဘာဝကို မသိတဲ့သူတွေအတွက်တော့ ဒီကာလဟာ ဒုက္ခအပေါင်း၊ ဘေးဆိုးအပေါင်းနဲ့အတူ သေမင်းနိုင်ငံဆီပို့ဆောင်ပေးရာ အပေါက်ဝ ဖြစ်လာနိုင်ပါတယ်။</p>\n        <p>ဒီကာလမှာ လူတွေဟာ လိမ်လည်ကြ၊ ရှုပ်ပွေကြနဲ့ ကိုယ့်ထက်လည်သူ၊ လိမ်သူနဲ့တွေ့ရင်တော့ တက်တက်ပြောင်သွားတတ်ပါတယ်။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">ရာဟုသက်ရောက်ရဲ့ ကောင်းကျိုးနဲ့ ဆိုးကျိုးများ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ကောင်းကျိုး</h4>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - ငွေရှာရတာ လွယ်ကူပေမဲ့ စုဆောင်းလို့ မရတတ်ပါဘူး။ ရွှေစတဲ့ ရတနာပစ္စည်းတွေ ဝင်တတ်ပါတယ်။</li>\n                <li><strong>လူမှုရေး</strong> - ကွဲကွာနေတဲ့ ချစ်သူဟောင်း၊ အပေါင်းအသင်းဟောင်းတွေနဲ့ ပြန်ဆုံစည်းရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ဆိုးကျိုး</h4>\n            <ul>\n                <li><strong>အိမ်ထောင်ရေး၊ အချစ်ရေး</strong> - ဒီကာလမှာ စန်းပွင့်လွန်းတာကြောင့် အပျို၊ လူပျိုလေးတွေ အိမ်ထောင်ရှိသူတွေနဲ့ ရှုပ်ထွေးတာ၊ အိမ်ထောင်သည်တွေ ဖောက်ပြန်တာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>ကျန်းမာရေး</strong> - လေထိုး၊ လေအောင့်၊ လေငန်း၊ လေဖြတ်နဲ့ အစာအိမ်ရောဂါတွေ ဖြစ်တတ်ပါတယ်။ အရှက်ကွဲမှုတွေကြောင့် စိတ်ပိုင်းဆိုင်ရာ ဒုက္ခတွေလည်း ရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">သတိပြုရမည့်အချက်များ</h2>\n    <ul>\n        <li>အိမ်ထောင်ရေး ရှုပ်ထွေးမှု၊ အပျော်အပါးတွေကို ရှောင်ပါ။ အရက်ရှောင်ပါ။</li>\n        <li>အိမ်မှာ ကိုယ်တိုင်မဟုတ်ရင်တောင် သားသမီးတွေကိုယ်တိုင် ဖောက်ပြန်တတ်လို့ အိမ်ထောင်ရေးရှုပ်ထွေးတဲ့လူတွေကို အိမ်မှာ လက်ခံတာမျိုး၊ ဧည့်သည်တွေနဲ့ ပူးတွဲနေစေတာမျိုး မလုပ်သင့်ပါဘူး။</li>\n        <li>ငွေဝင်လာရင် ကိုင်မထားဘဲ ရွှေဝယ်ထားပါဗျာ။</li>\n        <li>ရာဟုသက်ရောက်ဟာ စိတ်ထိန်းသိမ်းမှုအားနည်းတဲ့ ဂြိုဟ်ဖြစ်လို့ မလိုအပ်ဘဲ ကြွားဝါတာမျိုး၊ ရှုပ်တာမျိုးတွေ ရှောင်သင့်ပါတယ်။</li>\n    </ul>\n\n    <p class=\"note\">ဒီကာလမှာ ဖောက်ပြန်ခဲ့မယ်ဆိုရင် ရှေ့ဆက်ပြီး လာမယ့် လောကုတ္တရာခွင်မှာ ဆိုးကျိုးများစွာ ခံစားရတတ်ပါတယ်။</p>\n\n    ---\n\n    <h2 class=\"section-title\">ယသောလောကဓံ (ရာဟုသက်ရောက်) ဟောချက်များ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>၁ ကြွင်း မဟာဘုတ်သမားများ</h4>\n            <ul>\n                <li>ရာဟုဟာ မရဏသက်ရောက် ဖြစ်လို့ လူမှုရေး၊ အိမ်ထောင်ရေးတွေမှာ ပြဿနာဖြစ်ပြီး အမှုအခင်းတွေလည်း ကြုံရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>နေ့သားအလိုက်</h4>\n            <ul>\n                <li><strong>တနင်္ဂနွေသားသမီး</strong> - ၇ ခွင်မြောက် ဘုမ္မိဖြစ်ပြီး အသက် ၃၁ နှစ်နဲ့ ၃၉ နှစ်တွေမှာ ဘုမ္မိကြီးကျလို့ အထူးသတိထားသင့်ပါတယ်။</li>\n                <li><strong>အင်္ဂါသားသမီး</strong> - ရာဟုနဲ့ ရာ-ဇာ အတွင်းရန်ကျရောက်ပြီး မိသားစုနဲ့ အဆင်မပြေတာ၊ ရောဂါရတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>ဗုဒ္ဓဟူးသားသမီး</strong> - အပြင်ရန်ကျရောက်ပြီး ငွေကျပျောက်တာ၊ ခါးပိုက်နှိုက်ခံရတာတွေ ကြုံရတတ်ပါတယ်။ အသက် ၅၂ နှစ်တွေမှာ ရာဟုနှစ်ထပ်ကျလို့ အမှုအခင်းဖြစ်တာ၊ ဘဝပျက်တာမျိုးတွေ ကြုံရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">ယသောလောကဓံ (ရာဟုသက်ရောက်) ယတြာ</h2>\n    <p>ရာဟုသက်ရောက်ဟာ ကိုယ်ကျင့်တရားပျက်ပြားလွယ်တဲ့ကာလဖြစ်လို့ ကိုယ်ကျင့်တရားကို ထိန်းသိမ်းခြင်းဟာ အကောင်းဆုံးယတြာ ဖြစ်ပါတယ်ခင်ဗျာ။</p>\n    <ul>\n        <li>သီလစောင့်ထိန်းတာ၊ အဓိဋ္ဌာန်ဝင်တာနဲ့ အသုဘကမ္မဋ္ဌာန်းလို ဘာဝနာတွေ ပွားများနေထိုင်သင့်ပါတယ်။</li>\n        <li>ရေသန့်၊ ရေချို၊ ရေအေးတွေ လှူဒါန်းပါ။</li>\n        <li>မိဘ၊ ဆရာ၊ ဘုန်းကြီးတွေကို အဝတ်အထည်နဲ့ သင်္ကန်းတွေ လှူဒါန်းပေးပါ။</li>\n        <li>ဘုရားရင်ဘတ်တော်ကို ရွှေကပ်လှူတာ၊ လည်ပတ်နေတဲ့ စက်ပစ္စည်း (ပန်ကာ၊ နာရီ) တွေကို လှူဒါန်းပေးတာမျိုးတွေ လုပ်ဆောင်နိုင်ပါတယ်။</li>\n        <li>ကလေးသူငယ်တွေအတွက် ပျော်ပွဲရွှင်ပွဲတွေ လုပ်ပေးတာ၊ အစားအသောက်ကျွေးမွေးတာမျိုးတွေ လုပ်ဆောင်ပေးရင်လည်း ရာဟုသက်ရောက်ရဲ့ စိတ်ပူပန်မှုတွေနဲ့ ငွေကြေးအခက်အခဲတွေ ပပျောက်သွားနိုင်ပါတယ်ခင်ဗျာ။</li>\n    </ul>\n\n</body>\n</html>\n";
									_loadLokadhamHtml();
								}
								else {
									if (_matchesLokadhamTitle("သောကြာ")) {
										html = "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>သုခံလောကဓံ (ခေါ်) သောကြာသက်ရောက်</title>\n    <style>\n        body {\n            font-family: Georgia, serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            max-width: 800px;\n            margin: 0 auto;\n            padding: 20px;\n        }\n\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: Palatino, serif;\n            border-bottom: 2px solid #ddd;\n            padding-bottom: 5px;\n        }\n\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 4px #aaa;\n        }\n\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n\n        ul li::before {\n            content: \"•\";\n            position: absolute;\n            left: 0px;\n            color: #4CAF50;\n        }\n\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">သုခံလောကဓံ (ခေါ်) သောကြာသက်ရောက်</h1>\n\n    <div class=\"note\">\n        <p>သောကြာသက်ရောက်ကို <b>သုခံလောကဓံ</b>လို့ သတ်မှတ်ပါတယ်။ မြန်မာ့ရိုးရာဗေဒင်ပညာအရ သောမဂြိုဟ်ဖြစ်လို့ ကောင်းတဲ့သက်ရောက်တစ်ခုပါခင်ဗျာ။ ဒါဟာ ချမ်းသာကြွယ်ဝပြီး စည်းစိမ်ခံစားရတဲ့ဂြိုဟ်ဖြစ်ပေမဲ့ ရာဟုဂြိုဟ်နဲ့ ပူးတွဲနေတာကြောင့် ရာဟုရဲ့အကျိုးပေးတရားနဲ့လည်း ပတ်သက်နေပါတယ်။</p>\n        <p>ဒီကာလမှာ တည်တည်ငြိမ်ငြိမ်နေလို့မရဘဲ အမြဲတမ်း လှုပ်ရှားသွားလာနေရတတ်ပါတယ်။ သောကြာဂြိုဟ်ဟာ ခရီးဖြစ်တာကြောင့် သောကြာဂြိုဟ်အားကောင်းတဲ့သူတွေ (ရန်၊ မရဏ၊ ဘုမ္မိမကျတဲ့သူတွေ) အတွက် ပြည်တွင်း၊ ပြည်ပခရီးတွေ သွားလာရတာ အကောင်းဆုံးအချိန် ဖြစ်ပါတယ်။</p>\n        <p>ပြီးခဲ့တဲ့ ရာဟုနဲ့ ခုသောကြာကာလတွေမှာ ငွေစုဆောင်းလို့မရဘဲ မနက်ရရင် ညနေကုန်တတ်ပါတယ်။ ပျော်ပါးအပျော်အပါးကိစ္စတွေနဲ့ ကုန်တတ်လို့ ငွေမစုဆောင်းဘဲ အသုံးဝင်မယ့် ပစ္စည်းတွေ ဝယ်ထားသင့်ပါတယ်။ အစိုးရဝန်ထမ်းတွေအတွက်လည်း ရာထူးတိုးတာ၊ အပြောင်းအရွှေ့ရတာတွေ ဖြစ်တတ်ပါတယ်။ ဒီကာလမှာ ခရီးသွားရင် အဆင်ပြေပြီး ပျော်ရွှင်စရာတွေပဲ ကြုံရတတ်ပါတယ်ခင်ဗျာ။</p>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">သောကြာသက်ရောက်ရဲ့ ကောင်းကျိုးနဲ့ ဆိုးကျိုးများ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ကောင်းကျိုး</h4>\n            <ul>\n                <li><strong>ငွေကြေး</strong> - ငွေရှာရလွယ်ကူပေမဲ့ လွယ်လွယ်နဲ့ကုန်တတ်ပါတယ်။ စုဆောင်းလို့မရတဲ့ကာလဖြစ်ပြီး ရွှေထည်နဲ့ ဇိမ်ခံပစ္စည်းတွေ ဝင်တတ်ပါတယ်ခင်ဗျာ။</li>\n                <li><strong>စီးပွားရေး</strong> - အလုပ်အကိုင်တွေ အောင်မြင်ပြီး လူချစ်လူခင်ပေါများပါတယ်။ လုပ်ငန်းသစ်တွေ စတင်တာနဲ့ လုပ်ငန်းဟောင်းတွေ ပြန်ပေါ်လာတာမျိုးတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>လူမှုရေး</strong> - သွားလေရာမှာ စန်းပွင့်ပြီး ရာထူးတိုးတာ၊ နေရာကောင်းကို ပြောင်းရွှေ့ရတာတွေ ဖြစ်တတ်ပါတယ်။</li>\n                <li><strong>ကျန်းမာရေး</strong> - ကျန်းမာရေးကောင်းမွန်တတ်ပြီး ရောဂါရှိရင်တောင် အေးအေးချမ်းချမ်းနဲ့ပဲ ဘဝပြောင်းသွားတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ဆိုးကျိုး</h4>\n            <ul>\n                <li><strong>အိမ်ထောင်ရေး/အချစ်ရေး</strong> - အိမ်ထောင်ရှိသူတွေ၊ မရှိသူတွေအားလုံး အပျော်အပါးအရှုပ်အထွေးတွေနဲ့ မကင်းတတ်ပါဘူး။ ကိုယ်ကျင့်တရားပျက်ပြားတတ်ပါတယ်ခင်ဗျာ။ လူလွတ်တွေအတွက် အိမ်ထောင်ပြုရင်တော့ အဆင့်မြင့်ပြီး သစ္စာရှိတဲ့ အိမ်ထောင်ဖက်ကို ရတတ်လို့ အကောင်းဆုံးကာလပါခင်ဗျာ။</li>\n            </ul>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">သတိပြုရန်အချက်များ</h2>\n    <ul>\n        <li>ပြီးခဲ့တဲ့ ရာဟုသက်ရောက်တုန်းက ကိုယ်ကျင့်တရားပျက်ပြားခဲ့ရင် ဒီကာလမှာ စီးပွားဥစ္စာရှာဖွေရာနဲ့ ခရီးသွားရာမှာ အထစ်အငေါ့တွေ ကြုံရတတ်ပါတယ်။ အကျိုးအမြတ်နည်းတာ၊ ဘဝပျက်တာတွေအထိ ဖြစ်နိုင်ပါတယ်ခင်ဗျာ။</li>\n        <li>ပြီးခဲ့တဲ့ ရာဟုနဲ့ သောကြာကာလတွေမှာ မတရားရခဲ့တဲ့ငွေ၊ အရှုပ်ငွေတွေကို လာမယ့် တနင်္ဂနွေသက်ရောက်မတိုင်မီ စွန့်တာ၊ လှူဒါန်းတာမျိုး မလုပ်ရင် သူခိုး၊ ဓားပြဒဏ်တွေ ခံရတတ်ပါတယ်။</li>\n    </ul>\n\n    <p class=\"note\">သောကြာသက်ရောက်ကာလမှာ ကိုယ်ကျင့်တရားကောင်းပြီး သန့်ရှင်းတဲ့သူတွေအတွက်တော့ ဂုဏ်၊ ရာထူး၊ စီးပွားနဲ့ ပြည်တွင်း၊ ပြည်ပခရီးတွေပါ အကျိုးပေးတတ်ပါတယ်။</p>\n\n    ---\n\n    <h2 class=\"section-title\">သောကြာသက်ရောက် ခုနစ်ရက်သားသမီး ဟောချက်</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>၁။ တနင်္ဂနွေ၊ အင်္ဂါ၊ ဗုဒ္ဓဟူး၊ ကြာသပတေး၊ သောကြာ သားသမီးများ</h4>\n            <p>ဒီသားသမီးတွေအတွက်တော့ သောကြာသက်ရောက်ဟာ အပြစ်ကင်းပြီး ကောင်းကျိုးတွေပဲ ရရှိတတ်ပါတယ်ခင်ဗျာ။</p>\n            <ul>\n                <li><strong>စီးပွားရေး</strong> - အောင်မြင်ပြီး ဘယ်နေရာမှာလုပ်လုပ် အဆင်ပြေပါတယ်ခင်ဗျာ။ လုပ်ငန်းအသစ်တွေ တိုးချဲ့ရင် အောင်မြင်နိုင်ပါတယ်။</li>\n                <li><strong>ပညာရေး</strong> - အခက်အခဲမရှိဘဲ ကြိုးစားသလောက် လွယ်လွယ်ကူကူ အောင်မြင်နိုင်ပါတယ်ခင်ဗျာ။</li>\n                <li><strong>အိမ်ထောင်ရေး/အချစ်ရေး</strong> - ခရီးသွားရင်း အိမ်ထောင်ကျတတ်ပြီး အဆင့်မြင့်ပြီး သစ္စာရှိတဲ့အိမ်ထောင်ဖက်ကို ရတတ်ပါတယ်။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>၂။ တနင်္လာ၊ စနေ သားသမီးများ</h4>\n            <p>ဒီသားသမီးတွေကတော့ သောကြာသက်ရောက်မှာ ရန်တွေ၊ ဘုမ္မိတွေ ကြုံရတာကြောင့် အဆင်မပြေမှုတွေနဲ့ ရင်ဆိုင်ရတတ်ပါတယ်။</p>\n            <ul>\n                <li><strong>တနင်္လာသားသမီး</strong> - သောကြာနဲ့ အတွင်းရန်ကြုံပြီး ၇ ခွင်မြောက် ဘုမ္မိကြီး ကျရောက်တတ်ပါတယ်။</li>\n                <li><strong>စနေသားသမီး</strong> - သောကြာနဲ့ အပြင်ရန်ကြုံပြီး အသက် ၄၄၊ ၅၂၊ ၆၀ နှစ်တွေမှာ ဘုမ္မိနှစ်ထပ် ကျရောက်တတ်ပါတယ်ခင်ဗျာ။</li>\n            </ul>\n            <p>ဒါကြောင့် တနင်္လာနဲ့ စနေသားသမီးတွေဟာ စီးပွားရေးလုပ်ငန်းတွေမှာ အတိုက်အခံကြုံတာ၊ အလုပ်အကိုင် မအောင်မြင်တာတွေ ဖြစ်တတ်ပါတယ်။ လူမှုရေးမှာလည်း အရှက်ကွဲတာ၊ ဂုဏ်သိက္ခာကျတာတွေ ကြုံရနိုင်ပြီး အိမ်ထောင်ရေးမှာ ယာယီကွဲတာ၊ အရှက်တကွဲ အကျိုးနည်းဖြစ်တာတွေ ဖြစ်တတ်ပါတယ်ခင်ဗျာ။</p>\n        </div>\n    </div>\n\n    ---\n\n    <h2 class=\"section-title\">သုခံလောကဓံ (သောကြာသက်ရောက်) ယတြာ</h2>\n    <p>ဒီကာလမှာ သမ္မာဝါစာ (ကောင်းတဲ့စကား၊ မှန်တဲ့စကား) ကို ပြောဆိုကျင့်ကြံဖို့ အဓိက လိုအပ်ပါတယ်။</p>\n    <ul>\n        <li>လမ်းဘေးပတ်ဝန်းကျင်ကို သန့်ရှင်းရေးလုပ်တာ၊ တံတားဟောင်း၊ လမ်းပျက်တွေကို ပြုပြင်ပေးတာမျိုးတွေ လုပ်နိုင်ပါတယ်။</li>\n        <li>ဘုရားဖူးခရီးသွားတွေကို ခရီးစရိတ် ထောက်ပံ့ကူညီပါ။</li>\n        <li>တရားစာပေ၊ စာရေးကိရိယာတွေ လှူဒါန်းပါ။</li>\n        <li>သီလစောင့်တည်သူတွေကို ကုသိုလ်တစ်ခုခု ပြုလုပ်ပေးပါ။</li>\n        <li>ငါးသက်စေ့လွှတ်တာနဲ့ အဓိဋ္ဌာန်ဝင်ပြီး သက်သတ်လွတ်စားတာမျိုးတွေလည်း လုပ်ပေးနိုင်ပါတယ်ခင်ဗျာ။</li>\n    </ul>\n\n</body>\n</html>\n";
										_loadLokadhamHtml();
									}
									else {
										html = "<!DOCTYPE html><html lang=\"my\"><head><meta charset=\"UTF-8\">"
												+ "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
												+ "<style>body{font-family:sans-serif;background:#fff;color:#251b35;padding:24px;line-height:1.8}"
												+ "h2{color:#6b3fd4}.box{border:1px solid #e4dcf7;border-radius:12px;padding:18px;background:#faf8ff}</style>"
												+ "</head><body><div class=\"box\"><h2>လောကဓံ (၈) ပါး သက္ခတ်အဟော</h2>"
												+ "<p>သက်ရောက်အဟောကို ပြန်လည်တွက်ချက်နေပါသည်။ နောက်သို့ပြန်ဝင်ပြီး ထပ်မံဖွင့်ကြည့်ပါ။</p></div></body></html>";
										_loadLokadhamHtml();
									}
								}
							}
						}
					}
				}
			}
		}
	}
        function _menu1() {
		if (aa.getText().toString().equals("၁")) {
			dia.setTitle("၁ ကြွင်းအဟော📜");
			dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၁ ကြွင်း ဖြစ်ပါသည်။\n\n\n (၁)ကြွင်းဖွားများသည် ရုပ်ပိုင်းအနေဖြင့် ကျန်းမာကြံ့ခိုင်သန်စွမ်းသော ပုံစံမျိုး ရှိတတ်သည်။\n\nကိုယ်ခန္ဓာသည် လေးဒေါင့်ဆန်ပြီး ကျယ်ပြန့်သော ပုခုံးပြင်များ၊ အနည်းငယ် တိုတောင်းဟန်ရှိသော ခြေတန် လက်တန်များ ရှိတတ်သည်။ အသားအရေ ကြမ်းတမ်းတတ်သည်။ (အကယ်၍ ကိုယ်ခန္ဓာ ပိန်ပါးလျှင် ကျန်းမာရေး မကောင်းတတ်ပါ) စကားပြောလျှင် အသံကို ကျယ်လောင်စွာ ပြောတတ်သည် (Tone မြင့် သည်)။ စကားကို ကွေ့ဝိုက် မပြောတတ်ဘဲ လိုရင်း တိုရှင်း ပြောတတ်သည်။ စကားပြော တိုတောင်းသည်။ မာန်မာနကြီးသည်။ သည်းခံစိတ်နည်းပါးသည်။ မိမိအမှားကို ဝန်ခံရန် ဝန်လေးတတ်သည်။ သူတပါးကို အောက်ကြို့လိုစိတ်မရှိ။ အရာရာကို ကိုယ့်ခြေကိုယ့်လက် လုပ်လိုသည်။ သူတစ်ပါး ဝင်ရောက် စွက်ဖက်သည်ကို မကြိုက်တတ်ပါ။ လိမ္မာပါးနပ်မှု အလွန် နည်းပြီး စကားပြောရာတွင် (အထူးသဖြင့် သူတစ်ပါး၏ အပြစ်ကိုဖော်ထုတ်ရာတွင်) ပရိယာယ်သုံး၍ မပြောတတ်ခြင်းကြောင့် လူချစ်လူခင်နည်း တတ်သည်။ အချို့ သူတစ်ပါးကို လှောင်ပြောင်ရာ၌ ဝါသနာထုံသည်။ အချို့(၁)ကြွင်းဖွား များသည် သူတစ်ပါးအပေါ် အလွန်လွှမ်းမိုး လိုစိတ်ရှိတတ်သည်။ အထူးသဖြင့် မိမိအိမ်ထောင်ဘက် အပေါ်တွင် အလွန် အနိုင်ယူတတ်သည်။ မိမိအိမ်ထောင်ဘက် ကို အလွန်ချစ်မြတ်နိုးတတ်သော်လည်း လွှမ်းမိုးလိုစိတ် အမြဲရှိ သည်။ အိမ်ထောင်ရေးတွင် သူ့ဖက် ကိုယ့်ဖက် မျှတသော စိတ်မရှိသောကြောင့် အိမ်ထောင်ရေးပဋိပက္ခများ မကြာခဏ ဖြစ်ပွားတတ်သည်။ တစ်ကိုယ်ကောင်း ဆန်မှု များတတ်သည်။ (၁)ကြွင်းဖွားများသည် လူအုပ်စု၊ အဖွဲ့အစည်း၊ အသင်းအပင်းများနှင့် ဆက်နွယ်နေသော လုပ်ငန်းများနှင့် အကျိုးမပေးတတ်ချေ။ ဖက်စပ်၊ ရှယ်ယာ လုပ်ငန်းများ အကျိုးမပေးတတ်ပါ။ ဘဝတွင် ဖက်စပ်လုပ်ကိုင်ခြင်း၊ ရှယ်ယာ ထည့်ဝင်ခြင်း လုပ်ငန်းများမှ မကြာခဏ လိမ်လည်ခံရတတ်သည်။ လူမှုဆက်ဆံရေးနှင့် ဆိုင်သောလုပ်ငန်းများ၊ ဝန်ဆောင်မှု လုပ်ငန်းများထက် ကိုယ်တိုင်တီထွင်ဖန်တီးလုပ်ကိုင် ရသော ပညာရှင်အလုပ်များ၊ ကိုယ်တိုင် ကျွမ်းကျင်မှုဖြင့် လုပ်ရသော လုပ်ငန်းများဖြင့်သာ အကျိုးပေးနိုင်သည်။ စီမံခန့်ခွဲမှုပိုင်း အားနည်း တတ်သည်။ အများနှင့် စုပေါင်းလုပ်ကိုင် ရသော လုပ်ငန်းများထက် မိမိကိုယ်တိုင်လုပ်ကိုင် ရသော လုပ်ငန်း များဖြင့်သာ အသက်မွေးခြင်းသည် ပိုမိုကောင်းမွန်သည်။ ဝန်ထမ်း၊ လခစားလုပ်ငန်းများ အကျိုးပြုမှု အလွန် နည်းတတ်ပါသည်။ လက်အောက်ငယ်သား အကျိုးပေးသည်။ ဝန်ထမ်းကောင်း၊ တပည့်ကောင်းများ နှင့် ကြုံ ဆုံ တတ်သည်။ (၁)ကြွင်းဖွားများသည် ယေဘူယျ ကျန်းမာရေး ကောင်းမွန်သော သူများ ဖြစ်ကြသည်။ ကျန်းမာရေးနှင့် ပတ်သက်ပြီး လေနာရောဂါများ၊ လိပ်ခေါင်းရောဂါ၊ ပန်းနာရင်ကြပ်ခြင်း၊ အစာအိမ်ရောဂါ၊ သည်းခြေရောဂါ နှင့် ဝမ်းဗိုက် တွင် ခွဲစိတ်ခံရခြင်း၊ ကင်ဆာကဲ့သို့သော အကြိတ်အဖုရောဂါများ၊ အဆုတ်ရောဂါများ ဖြစ်တတ်သည်။ (၁)ကြွင်းဖွားများအနေဖြင့် ဘဝတွင် အောင်မြင်လိုလျှင် လူအများနှင့် အဆင်ပြေအောင် ပေါင်းသင်းတတ်ရန် လိုသည်။ သည်းခံစိတ်မွေးရမည်။ စကားကို လိမ္မာပါးနပ်စွာ ပြောဆို တတ်ရမည်။ မိမိကိုယ်ကို အားကိုးသင့်သည်။ အတတ်ပညာရှင်၊ အသိပညာရှင် ၊ အနုပညာရှင် လုပ်ငန်းများ ဖြင့် အကျိုးပေးနိုင်သည်။ အစုရှယ်ယာ၊ စပ်တူလုပ်ငန်း များ မလုပ်သင့်ပါ။ ဆရာမမွေးပါနှင့်။ ဆရာမွေး လျှင် ဆရာပျက်စီးသောအခါ မိမိပါအတူ လိုက်ပါ ပျက်စီးတတ်သည်။ ဆရာသမား၊ အပေါင်းအသင်း အကျိုးမပေးသော်လည်း တပည့်တပန်း အကျိုးပေးမှုများသည်။ မိမိဘဝတွင် တပည့်ကောင်းများကြောင့် ဘဝအခြေအနေ တိုးတက်မြင့်မားတတ်သည်။ လိမ်ညာပြောဆိုမှုများ၊ လှည့်ဖြားမှုများကို ရှောင်ရှားပါ။ မိမိ စိတ်ထဲတွင် ခံစားရချက်များအတိုင်း နှုတ်မှ ဖွင့်ဟပြောဆို တတ်မှုများကြောင့် လူချစ်လူခင်မများတတ်ဘဲ အသက်ကြီးသောအခါ သားသမီး၊ အိမ်ထောင်ဘက်၊ တပည့်လက်သား၊ အားလုံးက (ရွံကြောက်ကြီး ဖြစ် ကာ) အပစ်ပယ်ခံ အထီးကျန်ဘဝမျိုး ရောက်ရှိတတ်သည်ကို အထူးသတိပြုပါ။\n(ပညာရှင်တစ်ဦးဆီမှကိုးကားတင်ပြသည်။)");
			
			
		}
		else {
			if (aa.getText().toString().equals("၂")) {
				dia.setTitle("၂ ကြွင်းအဟော📜");
				dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၂ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n\n(၂)ကြွင်းဖွားများသည် ခန့်ငြားပေါ်လွင်သော ရုပ်ရည်၊ ဥပတိရုပ်မျိုး ရှိတတ် သည်။ များသောအား\n\nဖြင့် အရပ်အမောင်းမြင့်မားပြီး မျက်လုံးအကြည့် စူးရှ တောက်ပြောင် သည်။ လူချစ်လူခင်များတတ်ပြီး အပေါင်း အသင်း မိတ်ဆွေ ပေါများတတ်သည်။ မိမိ မိတ်ဆွေအပေါင်းအသင်းများပေါ်တွင် အလွန်အနစ်နာ ခံပြီး ပေါင်းသင်းတတ် လေသည်။ (၂)ကြွင်းဖွားများသည် လူတိုင်းအတွက် အပေါင်းအဖော်ကောင်း၊ မိတ် ကောင်းဆွေကောင်းများ ဖြစ်တတ်ကြသည်။ သို့သော် သူတို့သည် ခေါင်းမာသည်။ တစ်ယူသန်ဆန်သည်။ သူတစ်ပါး၏ အကြံပြုချက်များကို လက်မခံတတ်ဘဲ မိမိအယူအဆကိုသာ ရှေ့တန်းတင် လိုကြသူများဖြစ် ကြသည်။ မိမိလုပ်ချင်ရာကို တစ်ဇွတ်ထိုး လုပ်တတ်သည်။ တတ်သိနားလည်သူတို့၏ အကြံပေးချက်ကို လိုက်နာမှုမရှိဘဲ မိမိအယူအဆအတိုင်း တစ်ဇွတ်ထိုး လုပ်တတ်မှုကြောင့် ဘဝတွင် ဆုံးရှုံးမှု နှင့် အမှားများ မကြာခဏ ကြုံရတတ်သည်။ မိမိအပေါ် လွှမ်းမိုးမှုကို မကြိုက်သော်လည်း သူတစ်ပါး အပေါ်တွင်လည်း အလွန်အကျွံ လွှမ်းမိုးလိုစိတ် မရှိတတ်ကြ။ မိမိအပေါ် အလွန်အကျွံ လွှမ်းမိုးလာလျှင်လည်း ခေါင်းငုံ့ ခံတတ် ကြသူများမဟုတ်ဘဲ တော်လှန် တတ်ကြသူများဖြစ်ကြသည်။ ယေဘူယျအားဖြင့် မျှတသော စိတ်ထား ရှိ တတ်သည်။ သူတစ်ပါး၏ အခက်အခဲကို ကူညီတတ်သည်။ တာဝန်သိတတ်စိတ်ရှိသည်။ ဝတ်စားဆင်ယင်မှု များ၌ ခေတ်နှင့် ဆီလျှော်သည်ဖြစ်စေ၊မဖြစ်စေ မိမိနှစ်သက် သလို ဝတ်ဆင်တတ်သည်။ သူတပါး၏ ဝေဖန် မှု၊ ကဲ့ရဲ့မှုများကို ဂရုမစိုက်တတ်ကြပေ။ (၂)ကြွင်းသမားများသည် ဘာသာရေးကို လုံးဝမယုံကြည်သူများ (သို့) အလွန်အမင်းယုံကြည်ကြသူများ ဖြစ်ကြသည်။ သူတို့သည် ဘာသာရေးတွင် မဇ္စျိမကျသော (အလယ်အလတ်လမ်းထက်) နှစ်ဘက်အစွန်းသို့ ရောက် လွယ်ကြသူများ လည်းဖြစ်ကြသည်။ သူတို့သည် သဘာဝအားဖြင့် ဉာဏ်ပညာ ထက်မြက်ကြသူများဖြစ်ပြီး I.Q Level မြင့်မားကြသူ များဟု ခေါ်ဆိုနိုင်သည်။အတတ်ပညာမျိုးစုံကို အလွယ်တကူ သင်ကြားတတ်မြောက်နိုင်စွမ်းရှိကြသည်။ နားလည် သဘောပေါက်ရန် လွယ်ကူကြသူများ ဖြစ်ကြသည်။ ထို့ပြင် (၂)ကြွင်းသမားများသည် Will Power မြင့်မားတတ်ကြပြီး မိမိ ကိုယ်ကို အလွန်အမင်း ယုံကြည်တတ်ကြ သူများလည်း ဖြစ်တတ်ကြသည်။ (၂) ကြွင်းသမားများ၏ အားနည်းချက်များမှာ တစ်ဖက်သားအပေါ် ယုံကြည်လွယ်ခြင်း၊ အားနာတတ်ခြင်း၊ အပေါင်းအသင်း စုံလင် လွန်းသောကြောင့် အပျော်အပါးများလွန်းပြီး မိမိလုပ်ငန်းဆောင်တာများ လစ်ဟင်းခြင်း၊ အကြီးအကဲ၊ တတ်သိနားလည် သူများ၏ အကြံပြုချက်များကို မနာယူဘဲ မိမိကိုယ်ကို အထင်ကြီးလွန်းပြီး (Over Confident) ဖြစ်ကာ တဇွတ်ထိုး လုပ်မှုကြောင့် စီးပွားပျက်ခြင်း၊ ဒုက္ခမျိုးစုံတွေ့ရခြင်း၊ မူးယစ်ဆေး နှင့် အရက် အလွန်အကျွံ စွဲတတ်ခြင်း များပင်ဖြစ်သည်။ (၂)ကြွင်းသမားများသည် အိမ်ထောင်ရေးသုခ နည်း တတ်သည်။ အိမ်ထောင်ပြုမှားတတ်ကြသည်။ အိမ်ထောင်ပြုပြီးပြီးခြင်း နောင်တကြီးစွာ ရသော သူများကို (၂)ကြွင်းသမားများတွင် အများဆုံးတွေ့ရတတ်သည်။ များသောအားဖြင့် အိမ်ထောင်ဘက် ကို အားမကိုး ရတတ်ချေ။ မိန်းမဖြစ်လျှင် စီးပွားဥစ္စာ မရှာနိုင်သော ယောင်္ကျားမျိုးကိုရတတ်ပြီး ယောင်္ကျား ဖြစ်လျှင် အိမ်ထောင်ကို စီမံခန့်ခွဲမှု အားနည်းသော မိန်းမမျိုးကို ရတတ်သည်။ (၂)ကြွင်းသမား များသည် မိမိ အိမ်ထောင်ဘက် အပေါ်တွင် မည်သည့်အခါမှ စိတ်တိုင်းကျနိုင်သည် ဟူ၍ မရှိလှချေ။ (၂)ကြွင်းဖွား များသည် ယေဘူယျ ကျန်းမာရေး ကောင်းလှသည်ဟု မဆိုနိုင်ချေ။ များသောအားဖြင့် ကျန်းမာရေး အားနည်း တတ်သည်။ ဦးနှောက် နှင့် အာရုံကြောရောဂါများ ဖြစ်ပွားလွယ်သည်။ အသည်းရောဂါ နှင့် နှလုံးရောဂါဖြစ်ရန် အလွန် နီးစပ် သည်။ အဆုတ်လည်း အားနည်းတတ်သည်။ အာရုံခံစားမှုအင်္ဂါများ ပျက်စီး လွယ်တတ်သည်။ အသက်ကြီးလျှင် မှတ်ဉာဏ် အားနည်း တတ်သည်။ မတော်တဆ ထိခိုက်မှုများ ဖြစ်လွယ် သည်။ (၂)ကြွင်းဖွားများအနေဖြင့် ဘဝတွင် အောင်မြင်လိုလျှင် ခေါင်းမာခြင်း၊ တစ်ယူသန်ဆန်ခြင်းများကို ချိုးနှိမ်ပြီး တတ်သိ နားလည် သူများ၏ အကြံပေးချက်များကို လိုက်နာခြင်း၊ ကျွမ်းကျင်သူများနှင့် အတူ ပူးတွဲဖက်စပ်လုပ်ကိုင် သင့်သည်။ ထို့ပြင် အပေါင်း အသင်းများခြင်း၊ အပျော်အပါးများခြင်း များကို လျော့ ပေါ့သင့်သည်။ မူးယစ်ဆေး နှင့် အရက်သုံးစွဲမှုများကို လျော့သင့်သည်။ သို့မဟုတ်ပါက (၂)ကြွင်းဖွား များသည် အရည်အချင်းရှိပါလျှက်နှင့် မအောင်မြင် သူများအဖြစ် သတ်မှတ် ခံရတတ်သည်။\n(ပညာရှင်တစ်ဦးထံမှကိုးကားတင်ပြသည်။)");
				
				
			}
			else {
				if (aa.getText().toString().equals("၃")) {
					dia.setTitle("၃ ကြွင်းအဟော📜");
					dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၃ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n\n(၃)ကြွင်းဖွားများသည် မြင့်မားသော ဥပတိရုပ်နှင့် ကြည့်ပျော်ရှုပျော် ရှိကြသော ရုပ်အဆင်းကို\n\nပိုင်ဆိုင်ကြသူများ ဖြစ်ကြသည်။ သူတို့သည် လူအများအကြား တွင် သိသာထင်ရှား ပေါ်လွင်သော ဥပတိရုပ် နှင့် အဆင်းသဏ္ဍန်မျိုး ရှိတတ်ကြသည်။ ဆန့်ကျင်ဘက် လိင် များကို ဆွဲဆောင်နိုင်စွမ်းရှိကြသည်။ အမြဲ သွက်လက် ဖြတ်လတ်နေကြသူများ ဖြစ်ပြီး စိတ်အားထက်သန်မှု အလွန် မြင့်မားကြသည်။ တိုးတက်ကြီးပွား လိုစိတ် ပြင်းထန်ပြီး အလုပ်ကို မနေမနား လုပ်ကိုင်နိုင်စွမ်း ရှိကြသူ များလည်း ဖြစ်ကြသည်။ (၃)ကြွင်းဖွားများ၏ ငယ်စဉ်ဘဝသည် ခက်ခဲကြမ်းတမ်းကြသည်က ပိုများသည်။ သူတို့ မွေးဖွားလာကြချိန်တွင် မိဘာ များ အိမ်ထောင်ရေး ပဋိပက္ခဖြစ်နေချိန်မျိုးသော်၄င်း၊ စီးပွားရေး အဆင်မပြေဖြစ်နေကြချိန်များ ဖြစ်တတ် ကြသည်။ အချို့မှာ မိခင်၊ ဖခင်များ မစုံလင်တော့ဘဲ မိတစ်ကွဲ ဘတစ်ကွဲ ဖြစ်နေတတ်ကြသည်။ မိမိမွေးဖွား ပြီး နှစ်အနည်းငယ်အတွင်း မိဘ တစ်ဦးဦး ကွယ်လွန်သွားသော (၃)ကြွင်းများကိုလည်း အများအပြားတွေ့ ရတတ်သည်။ ထိုသို့ (၃)ကြွင်းဖွားများ၏ ပထမအရွယ်သည် ခက်ခဲကြမ်းတမ်းလေ့ ရှိတတ်ကြသော်လည်း ဒုတိယ၊ တတိယ အရွယ်များတွင် ကောင်းစားတတ်ကြလေ့ရှိသည်။ အထူးသဖြင့် (၃)ကြွင်းဖွား များသည် ဒုတိယအရွယ် နှင့် တတိယအရွယ် အစပိုင်း (အသက် ၂၅ နှစ် မှ ၆၅နှစ်) အတွင်း လျှမ်းလျှမ်းတောက် ကောင်းစားတတ်ကြသည်။ သို့သော် နာမည်အင်အား နည်းပါးခြင်း နှင့် ဘ၀အဆုံးသတ် ကံကြမ္မာ မ ကောင်းသော နာမည်မျိုးကို ပိုင်ဆိုင်ထားသူဖြစ်ပါက တတိယအရွယ်အဆုံးတွင် ကြီးပွားရေး၊ စီးပွားရေးများ အလွန်ဆုတ်ယုတ် ကျဆင်းတတ် ပြန်ပေသည်။ (၃)ကြွင်းဖွားများသည် အရွယ်ရောက်စကပင် လိင်ကိစ္စနှင့် ပတ်သတ်ပြီး အတွေ့အကြုံ ရှိတတ်ကြသည်။ အဆင်မသင့်လျှင် အိမ်ထောင်ကျ စောတတ်သည်။ (၃)ကြွင်း ဖွား အတော်များ များလိုပင် လိင်စိတ်ဆန္ဒပြင်းထန်ကြသူများ ဖြစ်တတ်ကြပြီး အချစ်ရေး၊ အိမ်ထောင်ရေး ကိစ္စများတွင်လည်း အရှုတ်အထွေး အလွန်များတတ်ကြသည်။ လိင်ကိစ္စနှင့် ပတ်သတ်ပြီး နာမည် ပျက်ခြင်း၊ အရှက်ကွဲခြင်းများ ကြုံရတတ်သည်။ အနေနီးစပ်သော သူများနှင့်၄င်း၊ ဆွေမျိုးသားခြင်း အချင်းချင်း သော်၄င်း ညိစွန်းမှုများကို (၃)ကြွင်းဖွားများတွင် အများဆုံး တွေ့ရတတ်သည်။ သူတို့သည် မျှော်လင့်မထား ဘဲ ရုတ်တရက် အိမ်ထောင်ကျခြင်းမျိုး ဖြစ်တတ်ကြသည်။ (၃)ကြွင်းဖွားများသည် မိမိကိုယ်တိုင် အိမ်ထောင်ရေး ရှုတ်ထွေးဖောက်ပြန်တတ်ကြသလို မိမိ အိမ်ထောင်ဘက်သည်လည်း အိမ်ထောင်ရေး ရှုတ် ထွေးသူမျိုးနှင့် ပြန်လည် ကြုံဆုံရတတ်သည်မျိုးက များသည်။ (အားလုံးကိုကား မဆိုလိုပါ) ။ အတွေ့ရများ တတ်သောသဘောကို ဆိုလိုခြင်း မျှသာ ဖြစ်ပါသည်။ ဘ၀တွင် အိမ်ထောင်ကွဲခြင်း၊ အိမ်ထောင်ပျက်ခြင်း၊ အိမ်ထောင်ဆက်များခြင်းများကို (၃) ကြွင်းဖွား များတွင် အများဆုံး တွေ့ရတတ်သည်။ သူတို့သည် ဉာဏ် ရည် ဉာဏ်သွေး အလွန်ထက်မြက်ကြသူများဖြစ်ကြပြီး အတွေးအခေါ်လည်း ကောင်းတတ်ကြလေ့ ရှိသည်။ ဘာသာရပ်မျိုးစုံ၊အတတ်ပညာမျိုးစုံကို တတ်မြောက်တတ် ကြသည်။ မိမိအလုပ်ကို တစ်ဖက်ကမ်းခတ် တတ်မြောက် ကျွမ်းကျင် ကြသူများဖြစ်ပြီး တပည့်လက်သားများ၏ လုပ်ကိုင်မှုများကို အမြဲလိုလို သဘောကျ ကျေနပ်နိုင်မှု မရှိကြသူများ လည်း ဖြစ်ကြသည်။ အရာရာကို မိမိခြေ၊ မိမိလက် လုပ်ရမှ ကျေနပ် ကြသူများဖြစ်ကြသည်။ (၃)ကြွင်းဖွားများသည် များသောအားဖြင့် ပေါင်းသင်းဆက်ဆံရေး ပြေပြစ်ကြ သူများ မဟုတ်ကြချေ။ စကားပြောဆိုရာတွင် ယဉ်ကျေးသိမ်မွေ့မှု နည်းပါးတတ်ကြသည်။ စိတ်တို ဒေါသကြီး လွယ်ကြပြီး စိတ်တိုနေချိန်တွင်အလွန်ကြမ်းတမ်းစွာ ပြောဆို ပြုမူတတ်ကြသည်။ (၃)ကြွင်းဖွား များသည် ဆန့်ကျင်ဘက် လိင်များကို ဆွဲဆောင်နိုင်စွမ်း မြင့်မားကြသည် ဆိုငြားသော်လည်း လူချစ်လူခင် မ များတတ်ကြပါ။ ထိုအချက်သည် နှုတ်ထွက် စကားကြမ်းခြင်း၊ ငါ့စကား ငါ့နွားရ ပြောတတ် ခြင်း၊ တို့ကြောင့်ဖြစ်ရလေသည်။ ထို့ပြင် (၃)ကြွင်းဖွားများသည် ယှဉ်ပြိုင်လိုစိတ်၊ အတိုက်အခံပြုလိုစိတ် အလွန်ကြီးမားကြ သူများ ဖြစ်ခြင်းကြောင့် များသော အားဖြင့် ရန်သူပေါများလေ့ ရှိတတ်ကြသည်။ မိမိအား ကွယ်ရာတွင် အပုပ်ချသူ ပေါများတတ်သည်။ (၃)ကြွင်းဖွားမျာသည် ကျန်းမာရေးအနေဖြင့် ခံတွင်း နှင့် သွားရောဂါများ၊ လေနာ ရင်ဘတ်နာခြင်းအောင့်ခြင်း၊ ခြေထောက် ပိုင်းတွင် ထိခိုက်မှုဖြစ်ခြင်း၊ မျက်လုံးထိခိုက်ခြင်း၊ တိမ်စွဲ ခြင်း များကြောင့် မျက်လုံးခွဲစိတ်ခံရခြင်း၊ ခရီးသွားစဉ် ထိခိုက်မှုဖြစ်ခြင်း၊ အဆုတ်နာ ဖြစ်ခြင်း၊ နှလုံးရောဂါ ဖြစ်ခြင်းများကို အထူးသတိ ထားရမည်။ (၃)ကြွင်းဖွားများသည် ဘ၀တွင် အကြီးစား ခွဲစိတ် ကုသမှုများ ခံရ ရန် အလားအလာ အလွန်များသည်။\n\n(၃)ကြွင်းဖွားများအနေဖြင့် ဘဝတွင် အောင်မြင်လိုလျှင်\n\nနှုတ်ထွက်ကြမ်းခြင်း ၊ ရန်လိုခြင်း၊ အတိုက်အခံပြုခြင်းများကို ရှောင်ရှား သင့်လှပေသည်။ ထို့ပြင်အလုပ်စွဲ ရောဂါမဖြစ်အောင် သတိထား နေထိုင်ခြင်း၊ အပန်းဖြေအနားယူခြင်း၊ စကားများများ ပြောဆိုမှုမှ ရှောင်ရှား ခြင်း၊ မိမိဒေါသကို ထိန်းသိမ်းခြင်း၊ တရားထိုင်ခြင်း၊ အေးချမ်းတိတ်ဆိတ်သော သဘာဝ ပတ်၀န်းကျင် ရှိရာ ဒေသများသို့ သွားရောက် နေထိုင်ခြင်းများကို ပြုလုပ်သင့်သည်။ နောက်ဆုံးအချက်အနေဖြင့် (၃) ကြွင်းဖွား များသည် ဘဝတွင် လိင်ကိစ္စကို အလွန်အကျွံ လိုက်စားခြင်းကြောင့် ဘဝပျက်ခြင်း၊ ကျန်းမာရေး ဆုံးရှုံးခြင်း၊ လူမှုရေးသိက္ခာကျခြင်းများ အလွန် ဖြစ်လွယ်ကြသည်ကို အထူးသတိပြုသင့်ကြပေသည်။\n(ပညာရှင်တစ်ဦးထံမှကိုးကားတင်ပြသည်။)");
					
					
				}
				else {
					if (aa.getText().toString().equals("၄")) {
						dia.setTitle("၄ ကြွင်းအဟော📜");
						dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၄ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n\n (၄)ကြွင်းဖွားမှန်ရင် လူမှုဆက်ဆံရေး ကောင်းမယ်။ ပါးနပ်လိမ္မာမယ်။ အပေါင်း အသင်းဆန့်မယ်။\n\nလူသိ အလွန်များတယ်။ ဘယ်လို လူမျိုးနဲ့မဆို ပေါင်းနိုင် သင်းနိုင်တယ်။ စကားပြောလည်း အလွန် လိမ္မာပါးနပ်မယ်။ လူကဲခပ် အလွန် ကောင်းတယ်။ လူကောင်းလူဆိုး ချက်ခြင်း သိနိုင်စွမ်းရှိတတ်တယ်။ ဖြောင်းဖြ ပြောဆိုတတ်တယ်။ ခပ်ရှင်းရှင်းပြောရရင်တော့ (၄)ကြွင်းဖွားတွေဟာ လူရည် လည်သူတွေ ဖြစ်ပါ တယ်။ ဒါပေမဲ့ သူတို့ဟာ မိဘ ဆရာ သမားတွေရဲ့ ဂုဏ်ကျေး ဇူးကို အထူးသိတတ်သူများလည်းဖြစ်တယ်။ လူကြီးသူမတွေကို ရိုသေကိုင်းရှိုင်းတတ်မယ်။ (၄)ကြွင်းဖွားတွေဟာ ငယ်စဉ်ကာလမှာ မိဘ၊ ဦးလေးအဒေါ်၊ အဖိုးအဖွားများရဲ့ အထူးချစ်ခင်မှု ၊ အလိုလိုက်မှုတွေကို အများဆုံး ခံကြရတတ်လေ့ရှိတယ်။ ကျန်တဲ့ အကြွင်းဖွားတွေရဲ့ နှိုင်းယှဉ်ကြည့်မယ်ဆိုရင် သူတို့ရဲ့ ငယ်စဉ်ဘဝဟာ အဆင်ပြေ ချောမွေ့တာက ပိုများပါ တယ်။ မိဘတွေ အိမ်ထောင်ရေး၊ စီးပွားရေးတွေ အဆင်ပြေနေချိန်မှာ မွေးဖွားလာတတ်ကြ တယ်။ ဒါမှ မဟုတ် သူတို့ မွေးဖွားပြီးချိန်ကစပြီး မိဘတွေ စီးပွားတတ်လာတတ်တယ်။ (၄)ကြွင်းဖွားတွေဟာ ငွေ၊ ဂုဏ်၊ အာဏာအခွင့်အရေးများကို မက်မော အထင်ကြီးလွယ်တယ်။ ချမ်းသာဖို့၊ အောင်မြင်ဖို့ အတွက်ဆိုရင် ဖြတ်လမ်းလိုက်တတ်တယ်။ ဘာမဆို လုပ်ရဲတဲ့ သတ္တိရှိတယ်။ (၄)ကြွင်းဖွားတွေဟာ အာဏာရှိသူများနှင့် အကျွမ်းတဝင်ဖြစ်လွယ်ပြီး အခွင့်အရေး များကိုလည်း ရအောင် ယူတတ်တယ်။ (၄)ကြွင်းဖွားအတော်များ များဟာ လောဘ သက္ကာယ ကြီးမားတတ်ကြပြီး ကြီးပွားချမ်းသာလိုစိတ် ပြင်းထန်တတ် ကြတယ်။ဘယ်လောက်ချမ်းသာချမ်းသာ ရောင့်ရဲ နိုင်တယ် မရှိအောင်ကို ဖြစ်တတ်တဲ့ (၄)ကြွင်းတွေလည်း တော်တော် များများတွေ့ရတတ်တယ်။ (၄)ကြွင်းဖွားတွေဟာ မိမိဘဝတိုးတက်အောင်မြင်ရေးအတွက် ကိုယ်ကျင့်တရား ကို ဖောက်ဖျက်ဖို့ ဝန်မလေးသူများ ဖြစ်တတ် တယ်။ ကတိမတည်ခြင်း၊ လိမ်လည်လှည့်ဖြားခြင်း တွေကို (၄)ကြွင်းဖွားတွေမှာ အများဆုံးတွေ့ရတတ်တယ်။ သူများပိုင်ငွေ၊ ဥစ္စာပစ္စည်းတွေကို အလွဲသုံးစား ပြုလုပ် လွယ်တတ်တယ်။ သူတို့တစ်တွေ ဘဝပျက်ကြတာဟာ ဒီအချက်ကြောင့်ဘဲ ဆိုတာ တွေ့ရတယ်။ (၄)ကြွင်း ဖွားတစ်ယောက်ဟာ နာမည်ပျက်သွားရင် ပြန်ပြီး နာလံထူဖို့ အလွန်ခဲယဉ်းတယ်။ ဒီအားနည်းချက်ကို စောင့် ထိန်းနိုင်တဲ့ (၄)ကြွင်းဖွားဖြစ်ရင်တော့ အလွန်ကြီးပွားတိုးတက်ပြီး ထိပ်တန်းရောက်အောင် အောင်မြင် တတ် တာဟာ အသေအချာပါဘဲ။ ဒါပေမဲ့ ဒီလို (၄)ကြွင်းသမားမျိုးကလည်း အလွန်ရှားလှပါတယ်။ ရှိတော့ရှိတယ် ရှားတယ်ပေါ့။ (၄)ကြွင်းဖွားတွေဟာ လူမှုဆက်ဆံရေး ကောင်းတယ်ဆိုပေမယ့် အပြင်ပန်းသာမန် ပေါင်းသင်း ဆက်ဆံမှု အနေနဲ့တော့ ဟုတ်လိမ့်မယ်။ ဒါပေမဲ့ စီးပွားရေးပိုင်းမှာတော့ အတိုက်အခံ အလွန်များတတ်တယ်။ မိမိနဲ့ အစပိုင်းမှာ မိတ်ဆွေ၊ လုပ်ဖော် ကိုင်ဖက်ဖြစ်နေသူများသော်မှ နောက်ပိုင်းမှာ ရန်သူတွေ ဖြစ်လာတတ် တယ်။ အပေါင်းအသင်းများပေမဲ့ မိတ်ဆွေစစ် အလွန်ရှားတတ်တယ်။ (၄)ကြွင်းဖွားတွေဟာ လုပ်ငန်းအပေါ် မှာ စီမံခန့်ခွဲမှု ကောင်းတတ်ကြတယ်။ လုပ်ငန်းတစ်ခုကို အောင်မြင်အောင် လုပ်ကိုင် နိုင်စွမ်းရှိတတ်ကြတယ်။ မိမိကိုယ်တိုင် လုပ်ကိုင်ခြင်းထက် လက်အောက်ငယ်သားတွေကို ခိုင်းစေရာမှာ ပိုမိုကျွမ်းကျင် တတ်ကြ ပါ တယ်။ စီးပွားရေး ဦးနှောက်ရှိတယ်။ လက်အောက်ငယ်သားတွေ အပေါ်မှာ ရက်ရောတယ်၊ ပေးကမ်း စွန့်ကြဲ တတ်တယ်။ အခက်အခဲရှိရင် ကူညီတယ်။ ဒါကြောင့် သူတို့မှာ သစ္စာရှိ တပည့်ကောင်းတွေ ရှိတတ်ကြတယ်။ သူတို့ ကိုယ်တိုင် ကလည်း အသုံးအစွဲ အလွန်ကြီးတယ်။ လက်ဖွာတယ်။ အကောင်းစား ပစ္စည်းတွေကိုသာ သုံးစွဲတတ်လေ့ရှိတယ်။ ပကာသန ကို မက်မောလွယ်တယ်။ လောကကြီးမှာ အသိပညာ၊ အတတ်ပညာ ဆည်းပူးခြင်း၊ လူ့လောက အကျိုးကို သည်ပိုး ခြင်းများထက် ကောင်းကောင်းနေ၊ ကောင်းကောင်းဝတ်၊ ကောင်းကောင်း စားသောက်ရခြင်းကို ပိုမိုခုံမင်တတ်တယ်။ တစ်ကိုယ်ကောင်း ဆန်သည်ဟုလည်း ဆိုနိုင် တယ်။ (၄)ကြွင်းဖွားတွေဟာ အပြင်ပန်းအနေနဲ့ ဆက်ဆံရေးကောင်းပြီး၊ ရက်ရောသဘောကောင်း သူတွေလို့ ထင်ရပေမဲ့ တကယ့်အရေးမှာ အနစ်နာ မခံနိုင်သူက ပိုများပါတယ်။ (၄)ကြွင်းဖွားတွေဟာ အိမ်ထောင်ရေးမှာ လည်း ရှုတ်ထွေးပွေလီလှပါတယ်။ ဘဝမှာ ရုတ်တရက် အိမ်ထောင်ကျတတ်တယ်။ တရားမဝင် အိမ်ထောင်ကျခြင်းမျိုးကို (၄)ကြွင်းဖွားတွေ မှာ အများဆုံးတွေ့ရတတ်တယ်။ အိမ်ထောင်ရေး ကိစ္စကို လေး လေး နက်နက် တန်ဖိုးမထားတတ်ကြပါ။ မိမိ အိမ်ထောင်ဘက်ကို အလွန်ချစ်မြတ်နိုးသည့် (၄)ကြွင်းဖွားများ ပင် လိင်ကိစ္စ ရှုတ်ထွေးမှု များကို မစွန့်လွှတ်နိုင်ကြတာကို တွေ့ရပါတယ်။ (၄)ကြွင်းဖွား မိန်းကလေးများကျ ပြန်တော့ အိမ်ထောင်ရေး အထူးကံဆိုးသူများလို့ ဆိုရပါမယ်။ မိမိအိမ်ထောင်ဘက်ဟာ အိမ်ထောင့်တာဝန် မ ကျေပွန်သူများ၊ လိင်ကိစ္စဖောက်ပြန် ရှုတ်ထွေးသူများ ဖြစ်တတ်တာကို အများဆုံး တွေ့ကြုံရတတ် ပါတယ်။ နောက်ဆုံးမှာ အိမ်ထောင်ဘက်ဖြစ်သူကို အရွဲ့တိုက်ကာ မိမိကိုယ်တိုင်လည်း အိမ်ထောင်ရေး ဖောက်ပြန်မှုများကို ကျူးလွန် မိတတ်တာကို သတိပြုကြပါ။ (၄)ကြွင်းဖွားတွေဟာ မိမိသားသမီးများအပေါ်မှာ အလွန် ချစ်ခင်မြတ်နိုးကြသူများဖြစ်တတ်ကြတယ်။ တာဝန်လည်း ကျေပွန် တတ်ကြတယ်။ အချစ်ကြီးတယ်။ အလိုလိုက်မှုများတယ်။ ဒါပေမဲ့ နည်းလမ်းစနစ်တကျ လမ်းညွှန်တတ်တာမဟုတ်လို့ သူတို့ ကလေးတွေဟာ ငယ်စဉ်ကာလမှာ ဆိုးသွမ်းတတ်ကြတယ်။ ဒါပေမဲ့ (၄)ကြွင်းဖွားတွေဟာ အသက်ကြီးလာရင် သားသမီး တွေ ရဲ့ ကျေးဇူးသိတတ်မှုကို အထူးခံစားရတတ်တယ်။ သားသမီးကံ ကောင်းတယ်လို့ ဆိုရမယ်။ (၄)ကြွင်းဖွား တွေဟာ ဘဝ နိမ့်မြင့်တက်ကျ အလွန်များတတ်ကြပါတယ်။ တည်ငြိမ်အေးချမ်းသော ဘဝအခြေအနေမျိုး မှာ ပုံမှန် မရှိတတ်ကြပါဘူး။ (၄)ကြွင်းမှန်ရင် ဘဝမှာ လောကဓံ တရားတွေကို အနည်းနဲ့အများ ခံစားကြရပါ လိမ့်မယ်။ ဒါပေမဲ့ သူတို့ တစ်တွေဟာ အခက်အခဲမျိုးစုံကို ကျော်ဖြတ် နိုင်စွမ်းရှိကြပါတယ်။ (၄)ကြွင်းဖွား တွေ အထူးသတိပြုရမဲ့ ရောဂါတွေကတော့ သွေးနှင့် ပတ်သက်သော ရောဂါများ၊ နှလုံးရောဂါ၊ သွေးတိုးခြင်း၊ ဦးခေါင်းကိုက်ခြင်း၊လေဖြတ်ခြင်း၊ အမျိုးသမီးများတွင် သားပျက်ခြင်း၊ သားသမီး အဖတ်မတင်ခြင်း၊ သားအိမ်ရောဂါဖြစ်လွယ်ပြီး ခွဲစိတ်ကုသခံရခြင်း၊ များ ခံရတတ်ပါတယ်။ မတော်တဆထိခိုက်မှုများလည်း ဖြစ်လွယ်တတ်ပါတယ်။ (၄)ကြွင်းဖွားတွေအနေနဲ့ ဘဝမှာ အောင်မြင်လိုရင် လောဘစိတ်ကို လျော့ခြင်း၊ ကတိတည်ကြည်ခြင်း၊ အပေါ်ယံ ပကာသနများအပေါ် တပ်မက်မှုကို လျှော့ခြင်း၊ တစ်ကိုယ်ကောင်းစိတ် မ မွေးခြင်း၊ အပြောနဲ့ အလုပ် ညီစေခြင်း၊ လိင်ကိစ္စ အပျော်အပါးများ လျော့နည်းစေခြင်း၊ မိမိအိမ်ထောင်ဘက် အပေါ် သစ္စာထားခြင်း၊ အခြားသူများ၏ ပိုင်ဆိုင်မှုများကို ထိန်းသိမ်း ရသည့် အနေအထားတွင် အလွဲသုံးစား မပြုမိအောင် အထူးသတိထားခြင်းများ လိုက်နာကျင့်ကြံသင့်သည်။ အပေါ်ယံ ဆက်ဆံရေး ကောင်းမွန်မှု ထက် လက်တွေ့ပါသော ကူညီမှု၊ စွန့်ကြဲပေးကမ်းမှုများကို ပြုလုပ်ပေးရမယ်။ အတွေးအခေါ် မြင့်မား စေမည့် စာအုပ်များကို ဖတ်ရှုလေ့လာသင့်ပါတယ်။ အထူးသဖြင့် ကတိတစ်ခု ပေးမိလျှင် မပျက်အောင် ထိန်းသိမ်း နိုင်မယ်ဆိုရင် ဘဝဟာ အောင်မြင်မှုတွေများများ ရရှိလာပါလိမ့်မယ်။\n(ပညာရှင်တစ်ဦးထံမှကိုးကားတင်ပြသည်။)");
						
						
					}
					else {
						if (aa.getText().toString().equals("၅")) {
							dia.setTitle("၅ ကြွင်းအဟော📜");
							dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၅ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n (၅)ကြွင်းဖွားတွေကတော့ အကြွင်းအားလုံးထဲမှာ နဲနဲ ထူးခြားတဲ့သူတွေ ဖြစ်ပါတယ်။ သူတို့ဟာ\nကိုယ်ခန္ဓာတည်ဆောက်ပုံအရ အရပ်အမောင်း သိပ်မြင့်မား ပိန်ရှည်တာမျိုး မတွေ့ရတတ်ဘူး။ အသက် (၄ဝ) ကျော်လာရင် ကိုယ်ခန္ဓာ ဝဖြိုးလာတတ် တယ်။ များသောအားဖြင့် ဥပတိရုပ် ကောင်းကြတယ်။ ရုပ်ချောတာ၊ မချောတာ ထက် ခန့်ညားမှုရှိပြီး လူအထင်ကြီးလွယ်တတ်တဲ့ ဥပတိရုပ်မျိုးတွေ ရှိတတ်တယ်။ (ချွင်းချက်= အသက် (၄ဝ)ကျော်လို့မှ ဝဖြိုးမှု ရှိမလာတဲ့ (၅)ကြွင်းဖွားများဟာ ကျန်းမာရေးထိခိုက်မှုသော်၄င်း ၊ စီးပွားရေး အဆင်မပြေမှုသော်၄င်း ဖြစ်နေကြတာကို အတွေ့ရများတတ်ပါတယ်) (၅)ကြွင်းဖွားတွေဟာ လူထူးလူဆန်း တွေလို့ ခေါ်ရမယ်ထင်တယ်။ သူတို့တစ်တွေဟာ အပြင်ပန်းအရ ကြည့်မယ်ဆိုရင်တော့ လူတွေအားလုံးနဲ့ အဆင်ပြေပေါင်းသင်းနိုင်တယ်။ လူကြားသူကြားထဲမှာ သွားလာထွက်ဝင် နိုင်တယ်။ လူသိအလွန် များတတ်တယ်။ ဒါပေမဲ့ သူတို့တစ်တွေဟာ အတွင်းစိတ်အရ အထီးကျန် ဆန်လွန်းလှတဲ့သူတွေဖြစ်တယ်။ သူတို့ ပေါင်းသင်း ဆက်ဆံ နေရတဲ့သူတွေဟာ လုပ်ငန်းသဘော၊ လူမှုရေးသဘောအရသာ ပေါင်းသင်းနေရပေမယ့် ကိုယ်နဲ့ စိတ်တူ၊ ကိုယ်တူ၊ ဝါသနာ မတူသူတွေက ပိုများနေတတ်တယ်။ သူတို့ ဘဝမှာ ဝါသနာတူ အဖော်ကောင်း၊ မိတ်ဆွေကောင်း အလွန်ရှားတယ်။ ဒီလိုဖြစ်ရတာဟာလည်း သူတို့ရဲ့ စရိုက်ဝါသနာကလည်း တခြားသူတွေနဲ့ မတူလှဘဲ တစ်မျိုး တစ်ဘာသာ ဖြစ်နေတာ ကြောင့်လို့ ဆိုနိုင်ပါတယ်။ ဒါဆို သူတို့က ဘယ်လိုလူစားမျိုးတွေပါလဲ။ (၅)ကြွင်းဖွားတွေဟာ ထူးဆန်းတဲ့ အလုပ်တစ်ခုခု၊ ဝါသနာတစ်ခုခုနဲ့ “ရူးနေကြ သူ”တွေဘဲဖြစ်တယ်။ “ရူး” နေတယ်ဆိုတာ Crazy ဖြစ်တာကို ပြောတာပါ။ (၅)ကြွင်းဖွားတော်တော်များ များ ဟာ “ဂမ္ဘီရ” လိုင်းနဲ့ ပတ်သက်နေကြတာ များတယ်။ ဗေဒင်လိုင်း၊ ဆေးလိုင်း၊ အဂ္ဂိရတ်နဲ့ ဓာတ်လုံးလိုင်း၊ အင်း လိုင်း၊ ဘိုးတော်လိုင်း၊ ထွက်ရပ်ပေါက်လိုင်း၊ ပုတီးလိုင်း၊ သမထလိုင်း၊ နောက်ဆုံး ဝိပဿနာလိုင်းပါ မကျန် အောင် ဆက်စပ်နေကြတာကို တွေ့ရတယ်။ ဒီလိုမှမဟုတ်ရင်လည်း သစ်ပင်ပန်းပင်ရူး၊ အိမ်မွေးတိရိစ္ဆာန်ရူး၊ ပန်းချီပန်းပုရူး၊ ဓာတ်ပုံရူးတွေဖြစ်နေ တာလည်း ရှိကြတယ်။ အခုခေတ်မှာ ကွန်ပျူတာ Crazy အလွန်ဖြစ် လွန်းတဲ့ လူငယ်တွေကို လေ့လာကြည့်ရင်လည်း (၅)ကြွင်းဖွားတွေက ပိုများတယ်။ နောက်ထပ် (၅)ကြွင်းဖွား မူကွဲသမားတစ်မျိုးလည်း ရှိပါသေးတယ်။ သူတို့ကတော့ အလုပ်ဆိုမှ အလုပ်၊ ငွေဆိုမှ ငွေ၊ ရာထူးအာဏာမှ ရာထူးအာဏာ လောက်သာ စိတ်၀င်စားပြီး ကျန်တာ ဘာကိုမှ စိတ်မ၀င်စားတာလည်း ရှိတတ်ပါတယ်။ (၅)ကြွင်းဖွားဟာ အလွန်ထူးဆန်းပြီး အသိရခက်ပါတယ်။ အစွန်းနှစ်ဖက် ရောက်နေသူများပါတယ်။ ဥပမာတစ်ချို့ (၅)ကြွင်း တွေဟာ လိင်ကိစ္စနဲ့ ပတ်သတ်လာရင် ဘုန်းကြီးတစ်ပိုင်းဖြစ်နေပြီး လုံး၀ စိတ်မ၀င်စား သလို၊ တစ်ချို့(၅)ကြွင်းကျလည်း လိင်ကိစ္စ အလွန်သောင်းကျန်းသူများဖြစ်နေတတ်ပါတယ်။ (၅)ကြွင်းဖွား တွေဟာ အလွန်အကြံပေးရ ခက်တဲ့သူတွေဖြစ်တယ်။ သူတို့ဟာ ကိုယ့်ကိုယ်ကိုလည်း အလွန်အထင်ကြီးတတ် ကြတယ်။ ပြန်မပြော နားမထောင်တွေဖြစ်တယ်။ ကိုယ်ထင်ရာ ကိုယ်လုပ်တတ်တယ်။ စီးပွားရေးကို ကျားကုတ်ကျားခဲ ရှာလိုသူတွေ မဟုတ်တတ်ကြဘူး။ ကိုယ်ဝါသနာပါတာ လုပ်နေရရင် ပြီးရော ဆိုတဲ့ လူစား မျိုးတွေဖြစ်တယ်။ မှားမှန်းသိပြီး မပြင်နိုင် တဲ့ အထဲမှာ (၅)ကြွင်းဖွားတွေ အတော်များတယ်။ တစ်ချို့ဆို အရက်၊ မူးယစ်ဆေး အလွန်အကျွံ စွဲနေပြီး မဖြတ်နိုင် ကြတော့တဲ့ ဘဝမျိုးကို ရောက်နေတတ်ကြတယ်။ (၅)ကြွင်းဖွားတွေဟာ ဘဝအပြောင်းအလဲ အလွန်နှေးကွေးတတ်တယ်။ ကောင်းစားနေရင်လည်း ရေရှည် ကောင်းစား နေတတ်သလို၊ ဘဝနိမ့်ကျ သွားပြီဆိုရင်လည်း လွယ်လွယ်နဲ့ ပြန် မတက်နိုင်တော့တာတွေကို အများဆုံးတွေ့ရတယ်။ (၅)ကြွင်းဖွားတွေအရမ်းဆင်းရဲတာတွေ့ ရသလို၊ အရမ်းချမ်းသာ နေတာတွေလည်း တွေ့ရတယ်။ ဒါပေမဲ့ သူတို့ဟာ ချမ်းသာ ကြွယ်ဝ မှုတို့ အောင်မြင်မှုတို့ကို ထူးထူးဆန်းဆန်းနည်းတွေနဲ့ ရရှိ လာတတ်တယ်။ သူတို့ကိုယ်တိုင် ကြိုးစားမှုထက် ကံတရား ကို၌က ကြံဖန်ဖြစ်လာတတ်တာမျိုးဖြစ်တတ် တယ်။ သူတို့မှာ ကံကောင်းတဲ့အချက်ကတော့ အိမ်ထောင်ဘက်ကောင်း ရတတ်ခြင်းပါဘဲ။ (၅)ကြွင်းဖွား တွေရဲ့ ဇနီးတွေဟာ အလွန်သည်းခံနိုင်စွမ်းရှိသူတွေလို့ ပြောရမယ်ထင်တယ်။ ကိုယ့် ယောင်္ကျား ဘာလုပ်လုပ်သည်းခံပေးနိုင်ကြတဲ့ ဇနီးမျိုးတွေနဲ့ ရတတ်တယ်။ တစ်ချို့ကျပြန်တော့လည်း မနိုင်လို့ သည်းခံ ရတာမျိုး လည်း ရှိမှာပေါ့။ (၅)ကြွင်းဖွား ယောင်္ကျားတွေဟာ ကိုယ့်အိမ်ထောင်ဘက် အပေါ်မှာ ကြင်နာယုယမှု သိပ်မရှိ ကြတာများပါတယ်။ သားသမီးလည်း နည်းတတ်တယ်။ တစ်ချို့ (၅)ကြွင်းဖွားတွေဆိုရင် သားသမီးလုံးဝမ ထွန်းကားတတ်ဘူး။ (၅)ကြွင်းဖွားတွေဟာ ယောင်္ကျားဖြစ်ဖြစ်၊ မိန်းမဖြစ်ဖြစ် အိမ်ထောင်ရေး ပြဿနာ နည်း တတ်ပါတယ်။ အဖိုးကြီး အဖွားကြီးဖြစ်တဲ့အထိ ပေါင်းသင်းသွားရတဲ့ (၅)ကြွင်းဖွားတွေ တော်တော် များပါ တယ်။ (၅)ကြွင်းဖွားတွေဟာ ဘာသာရေး အစွန်းရောက်သူတွေ ဖြစ်တာများတယ်။ တန်ခိုး ဣဒ္ဓိပါတ်ရှိသူ တွေ၊ ဘုန်းတန်ခိုး ပြနိုင်သူတွေကို အထင်ကြီးလွယ်တယ်။ ဒါကြောင့် (၅)ကြွင်းဖွားတွေ ဟာ ဘိုးတော်၊ မယ်တော်၊ နတ်ကတော်၊ ဆရာတော်တွေ စတဲ့ “ပုဂ္ဂိုလ်” များကို ကိုးကွယ်သူတွေဖြစ်နေတာများတယ်။ ဒါပေ မယ့် သူတို့ ကိုးကွယ်ယုံကြည်မှုဟာ ဘာသာရေးကြောင့် မဟုတ်ဘဲ မိမိဘဝကောင်းစားရေး အတွက်ဖြစ်နေ တတ်တယ်။ (၅)ကြွင်းဖွားတွေဟာ ဘဝကို ဖြစ်သလို နေတတ် စားတတ်တယ်။ ပေပေတေတေ နေတတ် တယ်။ စည်းကမ်းသိပ်မရှိလှဘူး။ လျှပ်တစ်ပြက် အကြံဉာဏ်ကောင်းပေမဲ့ ရေရှည် စီမံခန့်ခွဲမှုတော့ ညံ့ဖျင်း တတ်ကြတယ်။ သူတို့တစ်တွေဟာ စီးပွားရေး သမားကောင်းတွေတော့ မဟုတ်တတ်ကြဘူး။ ချမ်းသာလာ ရင်လည်း အသုံးအဖြုန်း အလွန်ကြီးကြတယ်။ သူတို့ဟာ ချမ်းသာ မှုကို ကြိုးစားမှုကြောင့်ထက် “ကံ”ကြောင့် သော်၄င်း၊ “ပုဂ္ဂိလ်” များရဲ့ မ စ မှုကြောင့်၄င်း ရရှိတာလို့ ယုံကြည်သူတွေက ပိုများ တယ်။ သူတို့ရဲ့ ဖြစ်စဉ် တွေကို လေ့လာကြည့် ပြန်တော့လည်း သူတို့ ယုံကြည်မှုဟာ ဟုတ်သလိုဖြစ်နေတတ်တယ်။ ကျန်းမာရေးနဲ့ ပတ်သက်လာရင် (၅)ကြွင်းဖွားတွေဟာ ကျန်းမာရေးကို သိပ်ဂရုစိုက်လှသူတွေ မဟုတ်ပါဘူး။ စားချင်သလို စား၊ အိပ်ချင်တဲ့ အချိန်အိပ်၊ သွားချင်သလို သွားလာနေထိုင် တတ်ကြပါတယ်။ ဒီ ဒဏ်ရာဒဏ်ချက်တွေဟာ အသက်ကြီး ပိုင်းမှာ ကျန်းမာရေး ထိခိုက်လာတတ်ကြပါတယ်။ (၅)ကြွင်းဖွားတွေ အထူးသတိထားရမယ့် ရောဂါကတော့ မျက်စေ့ရောဂါ နဲ့ ဆီးချိုရောဂါ တို့ဘဲဖြစ်ပါတယ်။ (၅)ကြွင်းဖွားတွေဟာ ဆီးချိုရောဂါ အင်မတန်ဖြစ်လွယ်တာကို သတိထားပါ။ တစ်ခြား သတိပြုရမယ့် ရောဂါကတော့ သွေးတိုးနဲ့လေဖြတ်ခြင်း တွေပါဘဲ။ (၅)ကြွင်းဖွားတွေဟာ ငယ်ငယ်မှာ ကျန်းမာရေး ကောင်းသလောက် အသက်ကြီးလာရင် ကျန်းမာရေး အလွန်ချုခြာတတ်တာကို သတိပြုပါ။ (၅)ကြွင်းဖွားတွေ အောင်မြင်ချင်ရင် ဘဝမှာ ကိုယ့်ထက် တတ်သိတဲ့ နားလည်တဲ့ သူတွေရဲ့ အကြံပေးမှုကို လက်ခံ လိုက်နာသင့်ပါတယ်။ တိုင်ပင်သင့်ပါတယ်။ ကိုယ် ထင်ရာ ကိုယ်လုပ်မှုကြောင့် မှားပြီးရင်း မှားရတဲ့ (၅)ကြွင်းတွေ များလှ ပါတယ်။ “ပုဂ္ဂိုလ်” ကိုးကွယ်မှုကို အလွန်အကျွံ မလုပ်သင့် ပါဘူး။ အလိမ်အညာတွေနဲ့ တွေ့ပြီး ဘဝနစ်မွန်းတတ်ပါတယ်။ (၅)ကြွင်းဖွားတွေ ဘဝပျက်ရတာဟာ ဘယ်သူ့စကား၊ ဘယ်သူ့အကြံပေးမှုကိုမှ\nနားမဝင်တော့ဘဲ ကိုယ်တစ်ဦးထဲရဲ့\nဆုံးဖြတ်ချက်ကို ရှေ့တန်းတင် လုပ်တတ်တဲ့အကြောင်းကြောင့် သာလျှင် ဖြစ်ကြောင်း လေ့လာ သုတေသန ပြုချက်များအရ တင်ပြလိုက်ရပါတယ်ခင်ဗျား။\n(ပညာရှင်တစ်ဦးထံမှကိုးကားတင်ပြသည်။)");
							
							
						}
						else {
							if (aa.getText().toString().equals("၆")) {
								dia.setTitle("၆ ကြွင်းအဟော📜");
								dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၆ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n(၆)ကြွင်းဖွားများဟာ ယေဘူယျ အားဖြင့် အကြွင်း (၇)ခုထဲမှာ ဘဝလောကဓံလှိုင်း အများဆုံးရိုတ်\nခတ်ခံရတဲ့ အကြွင်းဖြစ်သည်ကို လေ့လာတွေ့ရှိရပါတယ်။ (၆)ကြွင်းတွေဟာ မွေးလာပြီဆိုကတည်းက ဘဝ လောကဓံနဲ့ ရင်ဆိုင်ကြရပါတော့တယ်။ တစ်ချို့ဆိုရင် ကိုယ်ဝန်ရှိစဉ် အခါကတည်းက မိခင်၊ ဖခင်ဖြစ် သူများမှာ အိမ်ထောင်ရေး၊ စီးပွားရေး တွေ အဆင်မပြေကြပါဘူး။ သူတို့ မွေးဖွားလာတဲ့အချိန် (သို့မဟုတ်) မွေးဖွားပြီး မကြာချိန်မှာဘဲ မိဘတွေမှာ လောကဓံလှိုင်းနဲ့ တွေ့ရတတ်ပါတယ်။ အိမ်ထောင်ရေး အဆင်မပြေ ဖြစ်မယ်။ စီးပွားကျ၊ ရာထူးကျမယ်၊ အိမ်ထောင်ကွဲမယ်။ ကိုယ်ကိုယ်တိုင် ကျန်းမာရေး ထိခိုက်ကြမယ်။ အရွယ် ရောက်လာရင် ရန်သူများမယ်။ အတိုက်အခံများမယ်။ လုပ်ကြံချောက်တွန်းမယ့်သူများမယ်။ ဒါတွေ ဟာ (၆)ကြွင်းဖွားတွေမှာ အများဆုံးတွေ့ရတတ်ပါတယ်။ မွေးဖွားပြီး (၁၀) နှစ်အတွင်းမှာ မိခင်ဖခင်မစုံတော့ ဘဲ သေကွဲရှင်ကွဲဖြစ်ရတဲ့ ကလေးတွေအများစုဟာ (၆)ကြွင်းဖွားတွေ ဖြစ်ပါတယ်။ ဒုတိယ လိုက်တာက (၃)ကြွင်းဖွားပါ။ ဒါကြောင့် ကျွန်တော်ဟာ နီးစပ်သူ မိတ်ဆွေများကို (၆)ကြွင်း နှစ်နဲ့ (၃)ကြွင်းနှစ်တွေမှာ ကလေးမယူကြဖို့ အမြဲတိုက်တွန်းလေ့ရှိပါတယ်။ ဒါပေမယ့် အားလုံးဖြစ်ကြတာလားဆိုတော့လည်း မဟုတ် ပါဘူး။ အဖြစ်များတာကို ပြောတာပါ။ ကျွန်တော်လေ့လာပြီး ရာခိုင်နှုံးတွက်ကြည့်တာအရ မိဘမစုံတဲ့ (၆)ကြွင်းဖွား ရာခိုင်နှုံးဟာ (၆ဝ)% လောက်ရှိပါတယ်။ (၃)ကြွင်းဖွားရာခိုင်နှုံးက (၃၅)% လောက်ရှိပါတယ်။ ကျန်တဲ့ အကြွင်းဖွား(၅)ခုက တစ်ခုနဲ့တစ်ခု သိပ်မကွာပါဘူး။ (၁ဝ)ကနေ (၁၅)% လောက်အတွင်းမှာဘဲ ရှိပါ တယ်။ ဒါဟာ အသက် (၁ဝ)နှစ် အတွင်းမှာ ဖြစ်တာ ဖြစ်ပါတယ်။ ကိုယ့်ခြေထောက်ပေါ်ကို ကိုယ်မရပ်နိုင် သေးတဲ့ အချိန်မှာ မိခင် (သို့) ဖခင်တစ်ဦး ဆုံရှုံးရတယ်ဆိုတာ ကလေးငယ်တစ်ဦးအတွက် အင်မတန် ပြင်းထန်တဲ့ လောကဓံရိုက်ချက် တစ်ခု မဟုတ်ပါလားဗျာ။ အဲသည်လိုမှ မိခင်ဖခင် မဆုံးရှုံးဘူးဆိုရင် မိဘ တွေ စီးပွားကျခြင်းဒဏ်ကိုလည်း ခံစားရတတ်ပါသေးတယ်။ ပြီးတော့ (၆)ကြွင်းဖွား ကလေးငယ်တွေဟာ ငယ်စဉ်ကာလမှ ယုယကြင်နာသူ နည်းတတ်ကြတယ်။ မိခင်၊ ဖခင် ၊ ညီအစ်ကိုမောင်နှမ၊ အဖိုးအဖွား၊ ဦးလေး ဒေါ်လေး တွေရဲ့ ချစ်ခင်မှုကို သိပ်မရကြတာများတယ်။ အရွယ်ရောက်လာလို့ ကိုယ့်ဘဝကိုယ်ရုန်းကန်ရပြီဆို တော့လည်း (၆)ကြွင်းဖွားတွေဟာ အခက်အခဲများစွာနဲ့ ရုန်းကန်ကြရ တတ်ပါတယ်။ နောက်ပြီး အတောင်အလက်စုံလာလို့ ဘဝအဖေါ်ရှာလို့ အိမ်ထောင်ပြုကြပြီဆိုရင်လည်း (၆)ကြွင်းဖွား တွေဟာ အဆင်ပြေပြေ ဖြစ်ခဲပါတယ်။ အနှောင့်အယှက် များစွာကြားထဲက အိမ်ထောင်ပြုကြရတယ်။ ပြီးပြီလားဆို တော့ မပြီး သေးပါဘူး။ အိမ်ထောင်ရေးအဆင်မပြေကြလို့ အိမ်ထောင်ကွဲကြပြဲကြ တာမျိုးတွေ ဖြစ်တဲ့အထဲ မှာလည်း (၆)ကြွင်းဖွားတွေက အများဆုံးပါဘဲ။ (၆)ကြွင်းဖွားဆိုရင် အိမ်ထောင် (၂) ဆက်ဖြစ်တတ်တယ်။ ဖြစ်ဖို့အခွင့်အလမ်း များတယ်။ နောက်တစ်ခုက မုဆိုးဖို၊ မုဆိုးမ ဖြစ်လွယ်တယ်။ ဟုတ်ပါပြီ။ ဒါဆို (၆)ကြွင်း ဖွားတွေက ဘာကောင်းတာ ကျန်သေးလဲလို့ မေးစရာရှိလာပါတယ်။ အဲဒီ အမေးအတွက် အဖြေကလည်း ရှိ ပြီးသားပါ။ ကျွန်တော်ရေးတဲ့ ဗေဒင်ဆောင်းပါးတွေ ဟာ သူများရေးထားတဲ့ စာအုပ်တွေဖတ်-ကူးချ- စိတ်ထဲပေါ်တာရှောက်ရေးတာမျိုး လုံးဝမဟုတ်ပါဘူး။ လူဦးရေ ရာပေါင်းများစွာကို လက်တွေ့ သုတေသနပြုပြီးမှ ရေးတာပါ။ ကိုယ့်မြန်မာနိုင်ငံ၊ ကိုယ့် ပတ်ဝန်းကျင်က လူတွေတွင် မကဘဲ ကမ္ဘာပေါ်က ထင်ပေါ်ကျော်ကြား သူအားလုံးရဲ့ နာမည် နဲ့ မွေးသက္ကရာဇ်တွေကို လေ့လာစစ်ဆေးကြည့်ပြီးမှ ကိုယ်ပိုင်မူအဖြစ် ရေးသားထား တာချည်း ပါ။ ဒီလို သုတေသနလုပ်ကြည့်တော့ (၆)ကြွင်းဖွားတွေဟာ ဘဝလောကဓံကို ခံရလွန်းအားကြီးလို့ လားမသိပါဘူး။ နာနာ ရိုက်ပုတ်ခံရတဲ့ အိုးဟာ ပိုပြီး ခိုင်မာတယ်ဆိုတဲ့ စကားပုံလိုပေါ့။ ကမ္ဘာပေါ်မှာ အကျော် ကြားဆုံးလူတွေရဲ့ မွေးသက္ကရာဇ် တွေကို မဟာဘုတ်ချကြည့်ပြီး သုတေသနလုပ်ကြည့်တော့ အံ့သြစရာ ကောင်းတာက (၆)ကြွင်းဖွားတွေဟာ တကယ့်ကို ဆရာကြီးတွေ၊ အလွန်ထင်ရှားကျော်ကြားတဲ့ ပုဂ္ဂိုလ်တွေ ဖြစ်နေတာကို တွေ့လိုက်ရပါတယ်။ အရေအတွက်လည်း အများဆုံး၊ ထင်ပေါ်ကျော်ကြားမှုကလည်း သူများ လိုက်မမှီအောင် ဖြစ်နေတာကို တွေ့ပါတယ်။ (၆)ကြွင်းဖွားမှန်ရင် ဘဝတစ်ချိန်ချိန်မှာ အထွဋ်အထိပ်ကို ရောက်ကြတာ များပါတယ်။ ဒါပေမယ့် ဒီနေရာမှာလည်း လောကဓံ လှိုင်းတစ်ခုက လာပြန်ပါတယ်။ ဒီလို ရုတ်တရက် မြင့်မားသွား တဲ့ အခြေအနေရောက်လာပြန်ပြီဆိုရင်လည်း (၆)ကြွင်းဖွား အတော်များများဟာ အောက်ခြေလွတ်ကုန်ကြတာမျိုးဖြစ်ကြ ပြန်ပါတယ်။ ငါတည်းဟူသော မာန်မာန အလွန်ထောင်လွှားလာကြ ပြန်ပါရော။ အဲဒီ အချိန်မှာ အမှားတွေများများ လုပ်မိလာတတ်ကြတယ်။ အမှားတွေ သိပ်များလာတဲ့ အချိန် မှာ နောက်ဆုံး မှာတော့ အကြောင်းအကျိုး နိယာမအရ လောကဓံတရားကြီးက သူတို့ကို အမြင့်ဆုံးကနေ အ နိမ့်ဆုံးကို ပြန်ပစ်ချ လိုက်ပါတော့တယ်။ အဲဒီအခါမှာ (၆)ကြွင်းဖွားတွေဟာ အလွန်နိမ့်ကျတဲ့ ဘဝမျိုးကို ရောက်သွားရပြန်ပါတော့တယ်။ ကျွန်တော်အခုပြောနေတာတွေကို မယုံကြည်ဘူးဆိုရင်\nခင်ဗျား\nပတ်ဝန်းကျင်က ရင်နှီးသူတွေထဲက- (၁) ငယ်စဉ်ဘဝမှာ မိစုံဘစုံ မနေခဲ့ရသူတွေရယ် (၂) အိမ်ထောင်ကွဲပျက် ၊ အိမ်ထောင်ဆက် များနေသူတွေရယ် ၊ (၃) လောကဓံတရားအကြီးကြီးတွေနဲ့ ခဏခဏတွေ့ကြုံနေရသူတွေ၊ တွေကြုံ ရင်ဆိုင်ပြီးခဲ့ရသူတွေ - သူတို့တစ်တွေရဲ့ မွေးသက္ကရာဇ်ကိုတောင်းကြည့် ပါ။ (အင်္ဂလိပ်ခုနှစ်ဆိုရင်) မြန်မာလို ပြန်ပြောင်း- (၇)နဲ့စား။ အကြွင်းကို မှတ်ထား။ အနည်းဆုံး လူ (၂ဝ-၃၀)လောက်လေ့လာကြည့်။ အဲဒီ အထဲမှာ (၆)ကြွင်းဖွားက အများဆုံးဖြစ်နေတာကို လက်တွေ့ တွေ့ရပါလိမ့်မယ်ခင်ဗျား။ မဟုတ်ဘူးဆိုရင် ကျွန်တော်ဆီပြန်ပြီး စောဒကတက်ပါ။ ဒုတိယ အများဆုံးက (၃)ကြွင်းဖွားဖြစ်နေလိမ့်မယ်။ (၆)ကြွင်းဖွားတွေ ရဲ့ အဓိက အားနည်းချက်များကတော့ ကတိပေးလွယ်ခြင်း၊ ပေးပြီး ကတိကို မတည်ကြည်ခြင်း၊ အလုပ် တစ်ခုခုကို စွဲစွဲမြဲမြဲမလုပ်လိုခြင်း၊ အပျော်အပါးများခြင်း၊ အသုံးအဖြုန်းကြီးခြင်း၊ ပေါ်ပင်လုပ်ငန်းဟူ သမျှ လျှောက်လုပ်လိုခြင်း၊ အလွန်ကြီးပွားချမ်းသာလိုခြင်း၊ ထို့ကြောင့် ဖြတ်လမ်းနည်းဖြင့် မမှန်မကန်သော အလုပ်များကို လုပ်မိခြင်း၊ တွေးခေါ်စဉ်းစား ခြင့်ချိန်မှု နည်းပါးခြင်း၊ ကိုယ်အောင် မြင်ကျော်ကြားနေချိန်မှာ ဘယ်သူ့အကြံပေးချက်မှ နားမ၀င်တော့ဘဲ ကိုယ်ထင်ရာ ကိုယ်လုပ်ခြင်း၊ အတ္တကြီးခြင်း၊ ကိုယ့်တစ်ဘို့ထဲသာ ကြည့်တတ်ခြင်း၊ ခေါင်းအလွန်မာခြင်းများဘဲဖြစ်ပါတယ်။ အဲဒီအချက်တွေနဲ့ ဆန့်ကျင်ဘက် စရိုက်မျိုး၊ အထူးသဖြင့် ဖြောင့်မှန်ပြီး ကတိတည်ကြည်တဲ့ (၆)ကြွင်းဖွားတွေ ကျပြန်တော့လည်း အလွန့်အလွန်အောင်မြင်တာကို တွေ့ပါတယ်။ ဒီလို ဆန့်ကျင်ဘက် စရိုက်ဟာ တစ်ချို့ကျတော့လည်း မွေးရာပါ ပါလာပြီး၊ တစ်ချို့ကြလည်း ကျင့်ယူကြတာဖြစ်ပါတယ်။ ဘယ်လိုဖြစ်ဖြစ် ဒီလိုလူမျိုးတွေကျလည်း အလွန်အောင်မြင် ကြီးပွားတာကို တွေ့ရပြန်ပါတယ်။ ဒါကြောင့် (၆)ကြွင်းဖွားတွေဟာ စကားတည်၊ ကတိတည်ပြီး ကိုယ်ကျိုး ထက် အများအကျိုး ကို ကြည့်တတ်တဲ့သူဖြစ်ရင် ကျန်အကြွင်းဖွားတွေထက် အောင်မြင် ကျော်ကြားလွယ် သူတွေဖြစ်တယ်လို့ ဆိုချင်ပါတယ်။ ဒါပေမယ့် ခက်တာက (၆)ကြွင်းဖွားတွေဟာ ကိုယ့်အမှား နဲ့ ကိုယ့် အားနည်းချက်ကို သိမြင်လွယ်သူတွေမဟုတ်ကြဘူး။ အခုကျွန်တော်ရေးထားတဲ့\n(၆)ကြွင်းဖွားတွေရဲ့\nအားနည်းချက်တွေ ကို ကိုယ်တိုင် (၆)ကြွင်းဖွားဖြစ်သူတစ်ဦးက ဖတ်ကြည့်ပြီး ဒီဟောချက်တွေဟာ လုံးဝမမှ န်ဘူးး၊ မှားတယ်လို့ ပြောလိမ့်မယ်။ ဒါပေမယ့် (၆)ကြွင်းဖွား တစ်ယောက်နဲ့ အနီးကပ်ပေါင်းသင်း ဘူးတဲ့ သူ တစ်ယောက်ဟာ သူနဲ့ပေါင်းနေသူဟာ (၆)ကြွင်းဖွားမှန်းသိသွားတာနဲ့ ဒီဟောချက်တွေဟာ သိပ်မှန်တယ်လို့ ပြောလိမ့်မယ်။ (၆)ကြွင်းဖွားတွေဟာ ကိုယ့်အမှားကိုယ် အလွန် သိနိုင်ခဲတဲ့သူတွေဖြစ်တယ်။ လူတွေအားလုံး ဟာ ကိုယ့်အပေါ်မှာ မကောင်းကြဘူး။ ကိုယ်ကဘဲ သိပ်ကောင်းတယ်၊ သိပ်မှန်တယ်လို့ ထင်နေကြသူကများ တယ်။ (၆)ကြွင်းဖွားတွေဟာ “ပါးစပ်၊ စကား၊ ကတိ၊ အာမခံ၊ အကြွား၊ ငွေကြေးကိစ္စ”တို့ကြောင့် မကြာခဏ ဆိုသလို ဒုက္ခရောက်တတ်ပါတယ်။ (၆)ကြွင်းဖွားတွေဟာ ငွေနဲ့ သိပ်တည့်တဲ့ သူတွေမဟုတ်ပါဘူး။ ငွေများ များဝင်လာရင် လူပျက်စီး တတ်ပါတယ်။ ဒုက္ခတစ်ခုခုတွေ့တတ်ပါတယ်။ (၆)ကြွင်းဖွား လည်းဖြစ် အင်္ဂလိပ် မွေးရက်ဂဏန်းက (4)ဏန်းသမား နဲ့ (9)ဂဏန်းသမား တွေဖြစ်နေရင်တော့ သိပ်မလွယ် လှပါဘူး။ တစ်ယူသန်သမား တွေဖြစ်ပြီး ဖြောင့်ဖျ ပြောဆိုဖို့ အလွန်ခက်သူတွေဖြစ်ပါတယ်။ ဒုက္ခမျိုးစုံတွေနဲ့ အမြဲ လိုလို ရင်ဆိုင်နေရသူ တွေလည်းဖြစ်တတ်တယ်။\n(ပညာရှင်တစ်ဦးထံမှ ကိုးကားဖော်ပြသည်။)");
								
								
							}
							else {
								if (aa.getText().toString().equals("၀")) {
									dia.setTitle("၀ ကြွင်းအဟော📜");
									dia.setMessage("သင်ဟာ မူလမဟာဘုတ် ၀ ကြွင်းဖွားတစ်ယောက်ဖြစ်ပါသည်။\n\n (၀)ကြွင်းသမားတွေဟာ အကြမ်းဖျဉ်းပြောရရင် ရုပ်ပိုင်းရော၊ စိတ်ပိုင်းပါ အားနည်းပျော့ညံ့ ကြသူ\nတွေ များပါတယ်။ ကိုယ်ခန္ဓာ ကျန်းမာကြံ့ခိုင် မှုဘက်မှာလည်း အားနည်းတတ်တာ များတယ်။ စိတ်ဓာတ်ပိုင်း ကြံ့ခိုင်မှု မှာလည်း အားနည်းတတ်တာ များတယ်။ စိတ်နုတယ်။ စိတ်ထိခိုက် လွယ်တယ်။ ၀မ်းနည်းလွယ် တယ်။ မျက်ရည် ကျလွယ်တယ်။ ကိုယ့်ကို မကောင်းပြောခံရရင် တနုံ့နုံ့ တွေးပြီး စိတ်ဆင်းရဲ နေတတ်တယ်။ လောကဓံ တရားကို သိပ်ခံနိုင်ရည် မရှိတတ်ကြဘူး။ စိတ်ဆတ်ပြီး ကိုယ့်ကိုယ်ထိပါး ပုတ်ခတ်လာရင် ချက် ခြင်း တုန့်ပြန်တတ်ကြသူများ ဖြစ်ကြတယ်။ တစ်ချို့ (၀)ကြွင်းဖွား တွေဟာ ဒေါသသိပ်ကြီးတတ်ကြပြီး အမှားတွေ လုပ်မိကာ နောက်မှ နောင်တ ရတတ် ကြတာမျိုး တွေ ဖြစ်တတ်ပါတယ်။ (၀)ကြွင်းတွေဟာ များ သောအားဖြင့် စိတ်ထားကောင်းပြီး သူတစ်ပါးအပေါ်မှာ သနားကြင်နာ လွယ်သူတွေ ဖြစ်ကြပေမယ့် စိတ်နု တာ၊ မခံချင်စိတ် ကြီးမားလွယ်တာ၊ အထင်လွဲလွယ်တာ၊ သဘောထားမကြီးတာ တွေဟာ အားနည်းချက် တွေ ဖြစ်နေတတ်တယ်။ (၀)ကြွင်း သမားတွေဟာ ဆတ်ဆတ်ထိ မခံ သမားတွေ များပါတယ်။ ဒါပေမယ့် သူတို့ဟာ သူများအပေါ် မနာလို ၀န်တိုစိတ်တို့၊ ပြိုင်ချင်ဆိုင်ချင်တဲ့ စိတ်တို့တော့ နည်းတတ်တယ်။ ကိုယ့်ဟာ ကိုယ် အေးအေးချမ်းချမ်း နေလိုတယ်။ အပေါင်းအသင်း နည်းမယ်။ တစ်ခါ တစ်လေ ရည်မှန်းချက် အလွန် ကြီးပေမယ့် တစ်ခါတစ်လေ ထမင်းမငတ်ရင် ပြီးတာဘဲ စိတ်မျိုး ထားနိုင်ကြတယ်။ သူတစ်ပါး စိတ်ပါ လက် ပါ ကူညီ ကြလိုသူများ ဖြစ်တယ်။ ကိုယ့်ထက် နိမ့်ကျသူတွေ အပေါ်မှာ ကြင်နာစိတ် ကြီးမားတတ်တယ်။ ပေးကမ်း စွန့်ကြဲလွယ်တတ်တယ်။ ဒါပေမယ့် လောကွတ်တော့ သိပ်မလုပ်တတ်ဘူး။ မဖားတတ်ဘူး။ မျက်နှာ လို မျက်နှာရ မလုပ်တတ်ကြဘူး။ သူများဆီက ကျေးဇူးခံပြီးရင် တစ်နည်းနည်းနဲ့ ပြန်ဆပ်ရမှ ကျေနပ်ကြ သူများ ဖြစ်တယ်။ (၀)ကြွင်းတွေထဲမှာ အေးအေးချမ်းချမ်းနေချင်စိတ် များလွန်းတဲ့ သူများကြတော့ တစ်ချို့\nဆို ပျင်းတဲ့ဘက်ကိုပါ ရောက်သွား တတ်တယ်။ (၀)ကြွင်းတွေဟာ အလုပ်လုပ်ရာမှာ များသောအားဖြင့် “အထနှေး” တတ်ကြတယ်။ အပျင်းထူတတ်ကြတယ်။ ဟိုနေ့ရွှေ့ ဒီနေ့ရွှေ့ လုပ်တတ်ကြတယ်။ ဒါပေမယ့် လုပ်ပြီဟေ့ ဆိုရင် လည်း မီးကုန်ယမ်းကုန် မအိပ်မစား လုပ်နိုင်ကြတယ်။ (၀)ကြွင်းသမားတွေဟာ ဉာဏ်ပညာ သိပ်မထက်မြက်ကြပေမယ့် စူးစူးစိုက်စိုက် လုပ်နိုင်တဲ့ ဇွဲသတ္တိတော့ ကောင်းကြတယ်။ ရုပ်ပိုင်း ဆိုင်ရာ ကျပြန်တော့လည်း (၀)ကြွင်းသမားတွေဟာ ချုခြာပျော့ညံ့ ကြပါတယ်။ တစ်နေ့ရွှေ တစ်နေ့ငွေ ဆို တာမျိုး လိုပါဘဲ။ အားနည်းတဲ့ ကိုယ်ခန္ဓာ ဖွဲ့စည်းတည်ဆောက်ပုံမျိုး ရှိတတ်ကြတယ်။ အာရုံကြောအားနည်း တာ၊ သွေးအားနည်းတာ၊ အစာအိမ်အားနည်းတာ၊ နှလုံး အားနည်းတာ တွေဟာ (၀)ကြွင်းသမားတွေမှာ အဖြစ်များကြပါတယ်။ အပင်ပန်းဒဏ်ကို မခံနိုင်ကြဘူး။\n(၀)ကြွင်းသမား အတော်များများဟာ\nအစားအသောက် ဇီဇာကြောင်ကြပါတယ်။ အစားကောင်း အသောက်ကောင်းကို ခုံမင်တတ်ကြပါတယ်။ အစား အသောက်မှ မဟုတ်ဘူး။ နေရာတော်တော်များများမှာ ဇီဇာကြောင်တတ်ကြပါတယ်။ ကိုယ့်အဖေ အမေ အဖိုးအဖွားတွေထဲမှာ (၀)ကြွင်းများပါလာရင် ပြုစုရတာ သိပ်စိတ်ညစ်ဖို့ ကောင်းပါတယ်။ ဟိုဟာ အလိုမကျ ဒီဟာ အလိုမကျ ဖြစ်တတ်ပါတယ်။ (၀)ကြွင်းသမားတွေဟာ အ၀တ်အစား ဆိုရင်လည်း ဟို အရောင်မကြိုက်၊ ဒီပုံစံ မကြိုက် နဲ့ အလွန်ဂျီးများပါတယ်။ (၀)ကြွင်း သမားတွေဟာ အချစ်ရေး ကိစ္စတွေမှာ နူးညံ့သိမ်မွေ့ကြသူများ ဖြစ်ကြပါတယ်။ သူတို့ဟာ ဆန့်ကျင်ဘက် လိင်တွေကို ဆွဲဆောင်နိုင်တဲ့ ရုပ်ရည်မျိုး ရှိတတ်ကြတယ်။ ငယ်စဉ်ကာလမှာ အလွန် “စန်း” ပွင့်တတ်ကြတယ်။ ဒါပေမယ့် သူတို့ဟာ ကိုယ့်ကိုယ်ကို ထိန်းသိမ်းနိုင်သူများဖြစ်ပြီး အချစ်ရေး၊ အိမ်ထောင်ရေး ရှုတ်ထွေးမှု နည်းတတ်ကြတယ်။ များသောအားဖြင့် အချစ်ရေး၊ အိမ်ထောင်ရေး ကိစ္စတွေမှာ အရှက်အကြောက်ကြီးတယ်။ အိနြေ္ဒသိက္ခာ ထိန်းနိုင်ကြတယ်။ (၀)ကြွင်းတွေထဲမှာ ကြာသပတေး(ရာဇ) နဲ့ အင်္ဂါ (မရဏ)တို့ကလွဲရင် အချစ်ရေး အိမ်ထောင်ရေး ကိစ္စ ရှုတ် ထွေးမှု သိပ်မရှိတတ်ကြဘူး။ အင်္ဂါ နဲ့ ကြာသပတေး တွေကတော့ အရှုတ်များတတ်တယ်။ ကျန်တဲ့ နေ့ဖွား များကျတော့ များသော အားဖြင့် အိမ်ထောင်ရေး အဆင်ပြေကြပါတယ်။ အိမ်ထောင်ကွဲမှု နည်းတယ်။ ဒါပေ မယ့် (၀)ကြွင်းဖွား အင်္ဂါသမီး (မရဏ)ဖွား များကြတော့ အိမ်ထောင်ရေးကံ တော်တော် ဆိုးတတ်ကြပါတယ်။ တစ်ခုလပ်၊ မုဆိုးဖို၊ မလွတ်လပ်သူများနဲ့ တွေ့ကြုံတတ်ပြီး အိမ်ထောင်ရေးမှာ အမြဲစိတ်ဆင်းရဲတတ်ကြတာများပါတယ်။ လင်ဆိုးများတတ် ရတတ်တာကို သတိထား ရပါမယ်။ (၀)ကြွင်းတွေထဲမှာ တနင်္ဂနွေ၊ အင်္ဂါ၊ ကြာသပတေး သားသမီးတွေဟာ အိမ်ထောင်ရေး ညံ့တတ်ပါတယ်။ ယေဘူယျ ပြောရရင်တော့ (၀)ကြွင်းဖွား တွေမှာ ယောင်္ကျားလေး တော်တော်များများကတော့ အိမ်ထောင်ရေး ကံ ကောင်းကြ ပါတယ်။ ကိုယ့်အပေါ် အရမ်းချစ်တဲ့ မိန်းမမျိုးတွေနဲ့ အိမ်ထောင် ကျတတ်တယ်။ မိန်းကလေး (၀)ကြွင်းဖွားကျတော့ အိမ်ထောင်ရေး နဲနဲ ညံ့တတ်ပါတယ်။ (၀)ကြွင်းသမားများဟာ များသောအားဖြင့် ဘ၀ကံ ကောင်းကြပါ တယ်။ သိပ်ကြီးမားတဲ့ လောကဓံမျိုးတွေ တွေ့ရခဲပါတယ်။ သိပ်မချမ်းသာတောင်မှ လက်ထဲမှာ ငွေမပြတ် တတ်ကြပါဘူး။ ငွေကြေး ကံကောင်းကြတာ များတယ်။ အခက်အခဲ ဒုက္ခ တွေ့ရင်လည်း သိပ်အကြာကြီး မခံ ရဘဲ လွတ်မြောက် သွားကြပါတယ်။ ဆင်းရဲ ဒုက္ခကို ရေရှည်ခံစား နေရတာမျိုး တွေ့ရခဲပါတယ်။ လောကဓံ အလွန်များပါတယ်ဆိုတဲ့ (4)ဂဏန်းသမားများတောင် (၀)ကြွင်းဖြစ်နေရင် အခြား (4)သမားတွေ ထက် သက်သာပါတယ်။ အခက်အခဲကြုံရင် ကိုယ့်ကို ကူညီမယ့်သူ အမြဲရှိတတ်ပါတယ်။ (၀)ကြွင်းတွေမှာ သူများ ကို အောက်မကြို့ချင်တဲ့ မာနမျိုး ရှိတတ်တာမို့ သူတစ်ပါး လက်အောက်ခံလုပ်ငန်း၊ လခစား လုပ်ငန်းများနဲ့ ရေရှည် မသင့် တော်ပါဘူး။ ကိုယ်ပိုင် လုပ်ငန်းများနဲ့သာ သင့်တော်ပါတယ်။ ကိုယ်ပိုင်လုပ်ငန်း လုပ်ရင်လည်း အောင်မြင်လွယ် တတ်ကြပါတယ်။ ဒါပေမယ့် (၀)ကြွင်း သမားများဟာ လုပ်ငန်းတစ်ခု စလုပ်တဲ့နေရာမှာ တော့ အခက်အခဲ ပြဿနာမျိုးစုံနဲ့ ကြုံပြီးမှသာ အောင်မြင်ကြတာများပါတယ်။ (၀)ကြွင်းသမားတွေဟာ ဆွေမျိုးသားခြင်း၊ ညီအစ်ကို မောင်နှမ အလွန်အကျိုးမပေးပါဘူး။ ကိုယ့်ဘက်ကရော၊ ကိုယ့် ယောင်္ကျား/ မိန်းမ ဘက်ကရော နှိပ်စက်ကြသူတွေ များပါတယ်။ သူတို့ကို ဘယ်လောက် ကောင်းအောင်လုပ်ပေးပေမယ့်၊ ကူညီပေမယ့် ကွယ်ရာမှာ မကောင်းပြောပြီး ကျေးဇူး မသိတတ်ကြတဲ့ ဆွေမျိုးတွေက များပါတယ်။ ဆွေမျိုး အကျိုး မပေးပေမယ့်မိတ်ဆွေတော့ အလွန်အကျိုးပေးပါတယ်။ (၀)ကြွင်းသမားတွေမှာ မိတ်ကောင်း ဆွေ ကောင်း တွေနဲ့ တွေ့ကြုံ ရမယ့် ကံဇာတာ ပါပါတယ်။ ကိုယ် ဒုက္ခရောက်ရင် ကူညီမယ့် မိတ်ဆွေကောင်းတွေ\nရှိတတ်ပါတယ်။ လူချစ်လူခင် များတတ် ကြပါတယ်။ (၀)ကြွင်း သမားတွေ ဘ၀မှာ အထူးဂရုစိုက်ရမှာက “ကျန်းမာရေး” ပါ။ မကောင်းတဲ့ ဂြိုဟ် သက္ခတ်တွေထဲ ရောက်ပြီ ဆိုရင် တစ်ခြား အကြွင်းသမား တွေက စီးပွားရေး ပြဿနာဖြစ်၊ အိမ်ထောင်ရေး ပြဿနာဖြစ်၊ အမှုအခင်း ဖြစ်ကြပေမယ့် (၀)ကြွင်းဖွားများကတော့ ကျန်းမာရေးကိစ္စဘဲ ဖြစ်ကြတာ များပါတယ်။ အထူးသဖြင့် “အင်္ဂါသက္ခတ် နဲ့ စနေသက္ခတ်” မှာ ကျန်းမာရေး အထူးသတိထားကြရပါမယ်။ ဘ၀မှာ ခွဲစိတ်ကုသခံရခြင်း၊ သွေးထွက် သံယိုဖြစ်ခြင်းများ ဖြစ်လွယ်ပါတယ်။ Accident များလည်း အလွန်ဖြစ်လွယ်ပါတယ်။ (၀)ကြွင်းသမားတွေ ဖြစ်တတ်တဲ့ ရောဂါတွေကတော့ အာရုံကြောနဲ့ ပတ်သက်တဲ့ရောဂါ တွေ၊ အစာအိမ်ရောဂါ၊ အူရောင်ရောဂါ၊ နှလုံးတုန်ရင်ခုန်ခြင်း (နှလုံးရောဂါ အစစ်မဟုတ်)၊ စိတ်ချောက် ခြားတဲ့ရောဂါ၊ ည အိပ်မပျော်တဲ့ရောဂါ၊ ခေါင်းကိုက် ဇက်ကြောတက်ရောဂါ၊ စိတ္တဇ ရောဂါ၊ အမျိုးသမီးများမှာ သားအိမ်နဲ့ ပတ်သက်တဲ့ ရောဂါတွေ အဖြစ်များကြပါတယ်။ (၀)ကြွင်း သမားများအနေနဲ့ ဘ၀မှာ အောင်မြင်တိုးတက်လိုရင် စိတ်သဘောထားကြီးဖို့၊ သည်းခံစိတ်မွေးဖို့၊ သူတစ်ဖက် သားကို အထင်လွဲ မလွယ်ဖို့၊ အရာရာမှာ ဇီဇာမကြောင်ဖို့၊ မပျင်းရိ ဖို့ လိုပါတယ်။ စိတ်နုတာ၊ စိတ်ဆတ်တာတွေကြောင့် ဘ၀မှာ အောင်မြင်သင့်သလောက် မအောင်မြင်တဲ့ (၀)ကြွင်းတွေ တော်တော်များ ပါတယ်။ တစ်ချို့ (၀)ကြွင်းဖွားတွေ ကျပြန်တော့လည်း ပျင်းရိပြီး အပင်ပန်းမခံနိုင်ကြလို့ တိုးတက်သင့် သလောက် မတိုးတက်ကြပါဘူး။ (၀)ကြွင်းမှာ ကိုယ့်ဟာကိုယ် သီးသီးသန့်သန့် နေချင်တာကြောင့်ရယ်၊ လော ကွတ်မလုပ်တတ်တာရယ် တို့ကြောင့် တစ်ချို့လူတွေ အမြင်မှာ “ဘ၀င်မြင့်၊ မာနကြီးသူတွေ” လို့ မကြာခဏ အထင်ခံရတတ်တာကို သတိပြုပါ။ တစ်ကယ်တော့ (၀)ကြွင်း သမားတွေဟာ ပတ်၀န်းကျင်ကို သိပ်ဂရုမစိုက် ဘဲ သူတို့ နေတတ်သလို နေကြလို့ ဒီလို အထင်ခံရတာ ဖြစ်ပေမယ့် ဒီကိစ္စဟာ ဘဝအောင်မြင်ရေးကို ထိခိုက် နိုင်လို့ နဲနဲတော့ သတိထားသင့်တဲ့ ကိစ္စ ဖြစ်ပါတယ်။ ဒါပေမယ့် (၀)ကြွင်းသမားတွေဟာ အကြွင်းအားလုံးထဲ မှာ လောကဓံ အနည်းဆုံးဖြစ်ပြီး ဘ၀ကို သက်တောင့် သက်သာ နေထိုင်ဖို့ အခွင့်အလမ်း များသူတွေ ဖြစ်ပြီး ကြိုးစားရင် ကြိုးစားသလောက် အောင်မြင်နိုင်သူတွေ ဖြစ်ကြောင်းပါခင်ဗျား။\n(ပညာရှင်တစ်ဦးထံမှ ကိုးကားတင်ပြသည်။)");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _menu2() {
		if (at3.getText().toString().equals("၁")) {
			dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
			dialog.setMessage("တနင်္ဂနွေတန်းထက်မှာနေတဲ့ အတွက်ကြောင့် ကြီးသူမ, စမယ်၊ အိမ်ဟောင်းကို အနည်းငယ်ဖြစ်ဖြစ် ပြင်ဆင်ရမယ်။\nတနင်္လာကပြမှာ ရောက်နေတယ်။သည်တော့ ငွေထွက်မယ်။ ငွေလူလိမ်ခံရမယ်။ အိမ်ခေါင်ပျက်မယ်။ မိုးယိုမယ်။ ကလေးသူငယ်လိမ့်ကျတတ်တယ်။ မိန်းကလေးဖြစ်ရင် ဥပဒ်ရတတ်တယ်။ ယောက်ျားဆိုရင် အမြင့်ကကျတတ်တယ်။ငွေကို လူလိမ်ရင် ရေခြား၊ မြေခြား မြစ်ခြား အရပ်က မိန်းမနှင့် စပ်သွယ်ပြီး လိမ်တတ်တယ်။ သားသမီးထဲမှာ တနင်္လာရှိရင် ခြေ ထောက် ဒဏ်ရာရတတ်တယ်။ ခြေလက် အနာပေါက်တတ်တယ်။\nအင်္ဂါတိုင်ထိပ်မှာ ရောက်နေလို့ အင်္ဂါနံ စက်ပစ္စည်း စသည်ဝင်မယ်။ ဝင်ရင် အကျိုးပေးမယ်။ အင်္ဂါသားသမီး မ, စမယ်။ စုတ်ကောင်း လာဘ်ကောင်း ဝင်မယ်။\nအိမ်မှာ စွာတဲ့မိန်းမ ဥပဒ်ရမယ်။\nဗုဒ္ဓဟူး တိုင်ခြေမှာ ရောက်နေလို့ ဗုဒ္ဓဟူးနံ ရွှေ၊ လှေ၊ လှည်း၊ လူထွက် မယ်။ ဝင်လဲ ဝင်တတ်တယ်။ သူဆင်းရဲ ဧည့်သည်ဝင်တတ်တယ်။ ဝင်ရင် လက်မခံရဘူး။ လက်ခံယင် မိမိအိမ်က ခြေလေးချောင်း ထွက်တတ်တယ်။\nကြာသပတေး တိက္ခနိစ်မှာနေလို့ မြေ၊ မြင်း၊ မိန်းမ ထွက်မယ်။ ထွက်ရင် မကြည်မသာ ထွက်မယ်။ ဘေးဒုက္ခကြုံတဲ့ မိန်းမ အိမ်ပေါ် ရောက်ဖို့ရှိတယ်။ ရောက်ရင် မကောင်းဘူး။ အိမ်မှာမသန့်တဲ့ခြေရောက် မယ်။ အိမ်ထောင်ပျက် မိန်းမ ရောက်လာကိန်း ရှိတယ်။ ကြာသပတေးဆိုရင် ချစ်သူနှင့် ကွေကွင်းတတ်တယ်။ မိန်းမအိုနှင့် ဖြစ်ဖြစ်၊ မိန်းမပျက် နှင့် ဖြစ်ဖြစ် ညားတတ်တယ်။\nသောကြာမန္ဒနိစ်အိမ်မှာနေတဲ့အတွက်ကြောင့် ခရီးယာယီ သွားရတတ်တယ်။ သားသမီးအတွက် အပူသောက ရောက်ရတတ်တယ်။ အရှက်ကွဲရတတ်တယ်။ ဒါမှမဟုတ် တစ်ရပ်တစ်ကျေးမှာ သားသမီး ဥပဒ်ရ တတ်တယ်။\nစနေတန်းကပ်နေတဲ့ အတွက်ကြောင့် စနေနံဝင်ပြီး ပြန်ထွက်တတ်တယ်။ မိမိနှင့်နီးစပ် ပတ်သက်ရာမှာ ကိုယ်ဝန်ဆောင် မိန်းမရှိတတ်တယ်။ ကိုယ်ဝန်ဆောင် မိန်းမ မရှိဘူးဆိုရင် အမှုဖြစ်မယ်။ အမှုနှင့်ပတ်သက်လို့ပဲ ဖြစ်ဖြစ်၊ မိမိအိမ်ပေါ်ရောက်လာတဲ့ အမှုကြောင့်ပဲဖြစ်ဖြစ် သက်သေလိုက်ရတတ်တယ်။");
			
			
		}
		else {
			if (at3.getText().toString().equals("၂")) {
				dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
				dialog.setMessage("တနင်္လာတန်းထက်မှာနေတဲ့အတွက်ကြောင့် တနင်္လာနံ ကျောက်၊ ခွေး၊ ကြောင်စတဲ့ အရာတွေ ဝင်မယ်။ ကျောက်ဝင်ရင်လဲ ဈေးပေါပေါနှင့် ဝင်မယ်။ ငွေကြေးနှင့် ပတ်သတ်ပြီး မ,စမယ့်သူ တစ်ဦးနှစ်ဦး ပေါ် မယ်။ ခြေနှစ်ချောင်း ဝင်မယ်။ ကလေးငယ်ဖြစ်ဖြစ် ဝင်မယ်။ ခြေကျဉ်း၊ လက်ကောက်ဖြစ်ဖြစ် ဝင်မယ်။\nအင်္ဂါမှာ ပြနေတဲ့အတွက်ကြောင့် အင်္ဂါနံ ထွက်တတ်တယ်။ သား သမီးထဲမှာ အင်္ဂါရှိခဲ့ရင် မျက်စိမှာ ဥပဒ်ရောက်မယ်။ မျက်စိရောဂါ ဖြစ်ဖြစ်ရမယ်။\nဗုဒ္ဓဟူး တိုင်ထိပ်မှာနေတဲ့ အတွက်ကြောင့် ခြေလေးချောင်း လာဘ် ကောင်းဝင်မယ်။ ဗုဒ္ဓဟူးနံ ရွှေ, လှေ, စသည် ဝင်မယ်။ ဝင်ရင်လဲ ကောင်း တယ်။ အကျိုးပေးမယ်။ ရေသတ္တဝါ လိပ်ဝင်ရင်လည်း ကောင်းတယ်။ ဗုဒ္ဓ ဟူးသား အိမ်ကိုရောက်ဖို့ ရှိတယ်။ လူမျိုးကွဲ မ, စမယ်။ လူဝင်မယ်။\nကြာသပတေးတိုင်ခြေမှာ နေတဲ့အတွက်ကြောင့် မိမိပိုင်မြေ, မိန်းမ, ကြာသပတေးနံ ထွက်ပြီးမှ ပြန်ဝင်တတ်တယ်။ မြေထွက်ရင် ထွက်တဲ့ မြေဟာ မြေနိမ့်ပဲ။ မိန်းမထွက်ရင် အသက်ကြီးတဲ့သူနှင့် ခိုက်ရန်ဖြစ်ပြီး ထွက်လာတာဖြစ်တယ်။ အိမ်မှာ ပျားစွဲ ကောင်းစွဲမယ်။ နိမ့်တဲ့နေရာမှာ စွဲတတ်တယ်။ မြင့်တဲ့နေရာမှာ ပျားစွဲရင်တော့ ပရိတ်ရွတ်ပြီး မေတ္တာပို့။ အိမ်နှင့် မနီးမဝေးမှာ ကောင်းကျိုးမပေးတဲ့ ဆရာရှိနိုင်တယ်။ ရှိရင် အဲ သည်ဆရာ ပထမအိမ်ထောင်ပျက်စီးမယ်။ ဆရာကို ရောဂါ ဖိစီး မယ်။ မိမိအိမ်မှာဖြစ်ဖြစ် အိမ်အနီးအပါးဖြစ်ဖြစ် မုဆိုးမ ရှိမယ်။ ရှိရင်လည်း အဲသည်မုဆိုးမ ဘေးအန္တရာယ် တစ်ခုခုနှင့် ကြုံရမယ်။\n\nသောကြာ တိက္ခနိစ် အိမ်မှာနေတဲ့ အတွက်ကြောင့်သားသမီးထဲမှာ စကားထစ်သူရှိနိုင်တယ်။ ဒါမှမဟုတ်ရင် သားဆိုး သမီးဆိုး ရှိမယ်။ ခရီးသွားရမယ်။ ကြံစည်တိုင်း တစ်ကြိမ်တည်းနှင့် ဘယ်တော့မှ အကြံမ မြောက်တတ်ဘူး။ သားသမီးထဲမှာ သွားရောဂါ သွားဒုက္ခပေးသူ ရှိမယ်။သွားနှစ်ချောင်းတစ်မူထူးတတ်တယ်။ အဲသည် သားသမီးဟာ သောကြာ သားသမီး ဆိုရင်တော့ အိမ်မှာ မမွေးဖွားရပဲ တစ်ခြားတစ်အိမ်မှာ မွေးဖွား ရတတ်တယ်။ အဲသည် သားသမီး မွေးဖွားစဉ်အိမ်မှာ အန္တရာယ်ဒုက္ခ တစ်ခုခု ရောက်တတ်တယ်။\nစနေ မန္ဒနိစ် အိမ်မှာနေတဲ့ အတွက်ကြောင့် စနေနံထွက်မယ်။ ထွက်ရင်လည်း အနာတရနှင့် ထွက်မယ်။ အပူသောက တွေ့မယ်၊ အစေခံ ဖျားနာမယ်။ ဖောက်ပြန်မယ်။ အကြောအခြင်ကိုက်မယ်။ မင်းမှုထမ်းက အမှုရှာတတ်တယ်။\nတနင်္ဂနွေ တန်းကပ်မှာနေတဲ့ အတွက်ကြောင့် မိမိအိမ်နှင့် အလှမ်းမကမ်းမှာ အိမ်ပျက် တစ်ခုရှိမယ်။ ဒါမှ မဟုတ်ရင် ရေ၊ မြောင်း၊ ချောင်း၊ အင်း၊ အိုင်တခုခု အနီးအပါးမှာ ရှိမယ်။ ဒါမှ မဟုတ်ရင် မိမိအိမ်မှာ သူအိုဖြစ်ဖြစ် ရှိမယ်။ မရှိရင်တော့ ကောင်းတယ်။ ");
				
				
			}
			else {
				if (at3.getText().toString().equals("၃")) {
					dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
					dialog.setMessage("အင်္ဂါနံ အဝင်မှာ ရှိတယ်။ အင်္ဂါနံ စုတ်ဝင်မယ်။ ဆံစု၊ လက်စွပ်၊ စိန်ဝင်ကိန်းရှိတယ်။ ဝင်ရင်ကောင်းမယ်။ ကုန်ကူးသန်းမယ်ဆိုရင် အင်္ဂါနံ ဆန် ဆေး စသည်တို့နှင့် အကျိုးပေးမယ်။ အင်္ဂါသမီး, အင်္ဂါသားများ စောင်မ, ကြည့်ရှုမယ်။\n\nဗုဒ္ဓဟူး ပြမှာနေတဲ့အတွက်ကြောင့် အိမ်မှာ မိန်းမအတွက် အပူ သင့်သော ယောက်ျား၊ မိန်းမကြောက်ရသော ယောက်ျား ရှိမယ်။ ဗုဒ္ဓဟူး နံ ယာယီထွက်မယ်။ ထွက်သွားတဲ့ ဗုဒ္ဓဟူးနံ အနည်းအပါး ပျက်စီးမယ်။ ရွှေ၊ လှည်း၊ လူ စသည်ထွက်ကိန်း ရှိတယ်။ ဝင်ရင်ပျက်မယ်။ သွေးထွက် သံယို ဖြစ်ကိန်းရှိတယ်။\n\nကြာသပတေး တိုင်ထိပ်မှာနေလို့ ပညာဂြိုဟ်ကောင်းတယ်။ ပညာ ကောင်းရမယ်။ မြေ, မြင်း, မိန်းမ, စတဲ့ ကြာသပတေးနံ ဝင်မယ်။ ဝင်ရင် ကောင်းတယ်။ ကျေးဇူးပြုမယ်။ မိတ်ကောင်း ဆွေကောင်းနှင့်လည်း တွေ့ရ တတ်တယ်။\n\nသောကြာ တိုင်ခြေမှာရှိတဲ့ အတွက်ကြောင့် အိမ်မှာနာတာရှည် ရောဂါသည် ရှိတတ်တယ်။ အိမ်မှာမရှိရင် နေအိမ်အနီးအပါးမှာ ရှိမယ်။ မိမိနေအိမ်ကနေ ခြေနှစ်ချောင်း ခြေလေးချောင်း ထွက်တတ်တယ်။ အိမ် အနီးအပါးမှာ လူသေတတ်တယ်။ ပန်းနာ၊ လေနာ၊ သွေးအန်နာ နှိပ်စက်ခံ -ရသူလည်း ရှိတတ်တယ်။\n\nစနေ ပထမနိစ်မှာနေတဲ့အတွက်ကြောင့် နာရောင်း၊ ဆံထိုး၊ နွားနီ၊ နွားနက် စသဖြင့် စနေနံ ထွက်တတ်တယ်။ ထွက်သွားတဲ့ စနေနံမှာ အပြစ် အနာမကင်းရှိမယ်။ နွားဆိုရင် ဓားဒဏ်ရာ လှံချက် စသဖြင့် ပါမယ်။ နားဋောင်းဆိုရင်တော့ ဝက်အူပြုတ်ရင်ပြုတ်၊ မပြုတ်ရင် ကျောက်၊ ပုလဲ၊ စသည် ပြုတ်မယ်။ စနေညံ့တယ်။ နားလေးသူ နားပင်းသူ ရှိမယ်။ အိမ် မှာ မရှိရင် အိမ်နီးနားမှာ ရှိမယ်။ ကိုယ်မကောင်းသူဖြစ်ဖြစ် ရှိာတ် တယ် ဟော။ ဒါမှ မဟုတ် စိတ်ချောက်ချားနေသူ ရှိတတ်တယ်။\n\nတနင်္ဂနွေ ဒုတိယနိစ်မှာ နေတဲ့အတွက်ကြောင့် တနင်္ဂနွေနံ အထွက် ပြတယ်။ ထွက်ရင်လည်း ဒဏ်ရာဒဏ်ချက်နှင့် ထွက်မယ်။ အိမ်ပျက် ရင်ပျက်၊ မပျက်ရင် အိမ်အနီးအပါးမှာ အိမ်ပျက်ရှိမယ်။\n\nတနင်္လာ တန်းကပ်မှာ နေတဲ့အတွက်ကြောင့် အိမ်မှာ ချောင်းတ ဟွတ်ဟွတ်ဆိုးသူ ပိန်ညှောင်ညှောင်ရှိသူ ရှိတတ်တယ်။ ရေကန် ရေတွင်း အိမ်အနီးအပါးမှာ ရှိတတ်တယ်။ ခြေနှစ်ချောင်းအိမ်က ထွက်တတ်တယ်။ ထွက်ရင်လဲ ကောင်းကောင်း မွန်မွန် မထွက်တတ်ဘူး။ ခွေး၊ ကြောင်၊ ကြက်၊ ငှက် အဝင်မခံနှင့်၊ ဝင်ရင် အမှုဖြစ်တတ်တယ်။ အိမ်အနီးဝန်း ကျင်မှာ တနင်္လာနံသင့် သစ်ပင်ရှိတယ်။");
					
					
				}
				else {
					if (at3.getText().toString().equals("၄")) {
						dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
						dialog.setMessage("ဗုဒ္ဓဟူးနံ အဝင်မှာ ပြတယ်။ ရွှေ-လှေ-လှည်း-လူဝင်မယ်။ ရှင်သီဝလိရုပ်ထုကိုဖြစ်ဖြစ် ကိုးကွယ်ခွင့် ကြုံရတတ်တယ်။ ဗုဒ္ဓဟူးနံ ဝင်ရင် ကောင်း တယ်။\n\nကြာသပတေး ပြ-မှာနေတဲ့ အတွက်ကြောင့် အိမ်မှာ အိမ်ထောင် ပျက် လင်ကွဲ လင်ကွာ မိန်းမရှိမယ်။ မိန်းမ နေအိမ်က ထွက်တတ်တယ်။ထွက်တဲ့ မိန်းမ အကြံအစည် အထမမြောက်တတ်ဘူး။ ခြေလက်မှာ ဥပဒ် ရတတ်တယ်။ အိမ်မှ အရှက်တကျိုး ဖြစ်ဖူးတဲ့ မိန်းမရင်လဲ ရှိမယ်။ မရှိရင် မီးဖိုပျက်နေမယ်။ မီးဖိုမပျက်ရင် ရည်းစားနှင့် ကွဲနေတဲ့ မိန်းမ၊ လင်ကွာ၊ လင်ကွဲ မိန်းမရှိမယ်။ မီးဖိုချောင်လို့ မြွေရင်လဲ တက်မယ်။\n\nသောကြာတိုင်ထိပ် ရောက်နေတာကြောင့် အတောင်ပေါက်တဲ့ သတ္တဝါဝင်မယ်၊ ခြေမရှိ သတ္တဝါဝင်မယ်။ အမြန်ခရီးသွားရတတ်တယ်။ အရေးတကြီးခရီးသည် ဝင်မယ်။ ကြီးသူဥစ္စာစီးပွါးတက်မယ်။ ရပ်ဝေး ရောက် သားကြီး သမီးကြီး လာရောက်တတ်တယ်။\n\nစနေတိုင်ခြေခိုတာကြောင့် ကိုယ့်ထက်ကြီးသူအတွက် အပူမီး သင့်မယ်။ အိမ်မှာ ရာဇဝတ်မှုဖြစ်တတ်တယ်။ အိပ်ရာအနီးအပါးမှာ ရာဇ ဝတ်မကင်းတဲ့ ပစ္စည်းရှိတတ်တယ်။ အိမ်အနီးအပါးမှာ လူသေတတ် တယ်။ သေရင်လဲ အစိမ်းသေ သေမယ်။ ကိုယ်ဝန်ဆောင် ရှိနိုင်တယ်။ မီးဖွားရင် ယောက်ျားကလေး ဖွားမယ်။ ယောက်ျားကလေးမဖွားပဲ မိန်းက ဖွားရင်တော့ ကလေးဖြစ်ဖြစ်၊ လူကြီးမိဘဖြစ်ဖြစ် အန္တရာယ်တွေ့ကြုံ ရမယ်။ ဗုဒ္ဓဟူးထောင့်က မီးလန့်တတ်တယ်။ မီးလန့်လည်း အိမ်အနီး အပါးမှာ လူသေတတ်တယ်။ စနေနံ မြွေအိမ်ပေါ်တက်တတ်။ မြွေတက် ရင် သူခိုး ခိုးခံရကိန်း ရှိတယ်။\n\nတနင်္ဂနွေ နိစ်ကြီးဖြစ်လို့မို့ နေအိမ်အနောက်အရပ်က ပျက်တတ် တယ်။ အိမ်မှာ အိမ်ထောင်ပျက်ရှိရင် ခရီးယာယီ သွားရတတ်တယ်။ အိမ်ကို ပေါင်ထားရင် ပေါင်ထားရမယ်။ မပေါင်ထားရရင် အိမ်ဟောင်း ကို ကျားရင် ကန်ထားရတတ်တယ်။\n\nတနင်လာနိစ်အိမ်မှာနေတဲ့ အတွက်ကြောင့် မိမိအိမ်မှာ လင်ခိုး၊ မယားခိုး အရှက်တကွဲ ဖြစ်ပေါ်တတ်တယ်။ အစွပ်အစွဲခံရတတ်တယ်။ အိမ်မှာ မပေါ်ပေါက်ရင် အိမ်အနီးမှာ ပေါ်ပေါက်မယ်။");
						
						
					}
					else {
						if (at3.getText().toString().equals("၅")) {
							dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
							dialog.setMessage("ကြာသပတေးနံအဝင်ပြတယ်။ မြေ, မိန်းမ ဝင်တတ်တယ်။ မိန်းမဝင်ရင် လာဘ်ပါဝင်မယ်။ မိတ်ကောင်းရမယ်။ အမွေအနှစ်ရမယ်။ ပညာရေးကောင်းတယ်။\n\nသောကြာပြမှာ နေတာကြောင့် မရောက်ဖူးသေးတဲ့ ခရီးကို သွားရ တတ်တယ်။ အိမ်အနီးမှာ အရွယ်မရောက်သေးပဲ ဒဏ်သင့်ပြီး သွားကျိုး သူရှိမယ်။ ကလေးအမြင့်က ကျတတ်တယ်။ သော့ပျက်၊ သေတ္တာပျက် အိမ်မှာ ရှိနေတတ်တယ်။\n\nစနေတိုင်ထိပ်မှာ နေတာကြောင့် အထည်ကောင်းဝင်တတ်တယ်။ စနေနံ ထီး၊ ဓား၊ ဖိနပ် လက်ဆောင်ရတတ်တယ်။ နွားဝင်တတ်တယ်။ ဝင်တဲ့နွား နွားနီ၊ နွားနက်ဖြစ်မို့ များတယ်။ ဦးချိုမကောင်း ရှိတတ်တယ်။ နေအိမ်မှာ မြွေဝင်တတ်တယ်။ သူတပါး အပ်နှံထားတဲ့ စနေနံ ထီး၊ ဓား၊ ဖိနပ် ရောက်နေတတ်တယ်။အကျိုးပေးစေဖို့ ထီးဖြူလုပ်ပြီး ဘုရားကိုလှူ။\nတနင်္ဂနွေတိုင်ခြေမှာ နေတာကြောင့် အိုးပိုင်၊ အိမ်ပိုင် ထိုအသက် အပိုင်းအခြားမှာမရနိုင်။ အိမ်မှာ ခါးကုန်းတဲ့သူ ခြေလက် မသယ်နိုင်သူ၊ အသက်ကြီးသူ ရှိတတ်တယ်။\nတနင်္လာ ပထမနိစ်မှာ နေတာကြောင့် ငွေကြေးလူလိမ်ခံရတတ် တယ်။ ငွေအတွက် စကားများရတတ်တယ်။ ငွေကုန်ကြေးကျ များမယ်။ ငွေအတွက် အပူသောက တွေ့ရတတ်တယ်။ အငယ်ဆုံးကလေးရဲ့ အ ထက်ကလေး ခြေထောက် ထိခိုက်ဒဏ်ရာ ရတတ်တယ်။ အိမ်က ထွက် တတ်တယ်၊ ဥပဒ်ရတတ်တယ်။ နေအိမ်လှေခါး ပျက်နေတတ်တယ်။ မိမိကိုယ်မှာ ဒါမှ မဟုတ်ရင် ခြေနှင့်လက်မှာ အန္တရာယ်ဖြစ်တတ်တယ်။ ခါးနာတတ်တယ်။ အိမ်မှာ တနင်္လာ သားသမီးရှိရင် အမြင့်ကလိမ့်ကျ တတ်တယ်။\n\nအင်္ဂါဒုတိယနိစ်မှာ ရှိတာကြောင့် အင်္ဂါနံအတွက် အပူသောက ဖြစ်ရတတ်တယ်။ အင်္ဂါနံအထွတ်ပြတယ်။ အင်္ဂါနံပါ နာမည်၊ သားသမီး အကျိုးမပေးဘူး။\n\nဗုဒ္ဓဟူးတန်းကပ်မှာ ရှိတာကြောင့် ဗုဒ္ဓဟူးသား ဧည့်သည်စောင် သည် အိမ်ကို ရောက်လာတတ်တယ်။ အိမ်မှာ ရယ်စရာ ပြောတတ်သူ ရှိမယ်။ ဒါမှမဟုတ်ရင် ယောင်တတ်သူရှိမယ်။ ရွှေဝင်ပြီး ရွှေထွက်ကိန်း ရှိတယ်။ ခြေလေးချောင်းအတွက် စိတ်ဓာတ် မချမ်းမသာ တွေ့ရတတ် တယ်။");
							
							
						}
						else {
							if (at3.getText().toString().equals("၆")) {
								dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
								dialog.setMessage("အိမ်မှာ ခရီးသွားမည့် ဆဲဆဲလူရှိမယ်။ သောကြာနံ အဝင်ပြတယ်၊ သားသမီးတို့ကို မင်္ဂလာဆောင်ပေးရကိန်း ရှိတယ်။ မိမိကိုယ်တိုင် ခရီး ထွက်ရကိန်း မြင်တယ်။\n\nစနေ ပြမှာနေတာကြောင့် အိမ်မှာ မျက်စိတိမ်စွဲသူ ရှိတတ်တယ်။ စနေနံ အထွက်ပြတယ်။ ပျက်တတ်တယ်။ အိမ်မှာ စနေသားသမီးရှိရင် ချစ်သူနှင့် ကွေကွင်းရတတ်တယ်။\nတနင်္ဂနွေတိုင်ခြေမှာ နေတာကြောင့် ကြီးသူ မ, စမယ်။ အိမ်အနီးအ ပါးမှာ အပျိုကြီး လူပျိုကြီး ရှိတတ်တယ်။ အိမ်သစ်ရတတ်တယ်။ တနင်္ဂနွေ သားဖြစ်ရင် မယားနှစ်ယောက် ရကိန်းရှိတယ်။ ကြီးကဲသူ မ, စရင်လဲ တစ်ဦးတစ်ယောက်ထဲ မဟုတ်ဘူး။ နှစ်ဦးသုံးဦး မ, စကိန်းရှိတယ်။ ခြေ ကျဉ်း ပျောက်ရှတတ်တယ်။ သူခိုး ခိုးခံရတတ်တယ်။ လက်ဆစ်ခြေဆစ် မှာ သွေးထွက်သံယို ဖြစ်ဖို့ရှိတယ်။ ခွေး၊ ကြောင်၊ ကြွက် ဝင်မယ်။ ငွေကြေး ကြွေးတင်တတ်တယ်။ ကြွေးမတင်ရင် ငွေကုန်ကြေးကျ များတတ်တယ်။ ခွေးစတဲ့ အဆိပ်ရှိတဲ့ သတ္တဝါ အကိုက်ခံရတတ်တယ်။\nအင်္ဂါ ပထမနိစ်မှာ နေတာကြောင့် အင်္ဂါအထွတ်ပြတယ်။ မျက်စိအန္တရာယ်ဖြစ်မယ်။ အင်္ဂါသားသမီးအတွက် သောကဖြစ်ရ ကိန်းရှိတယ်။ အိမ်မှာ လင်ကွာ မယားကွာသူ ရှိတတ်တယ်။\nဗုဒ္ဓဟူး အထက်နိစ်မှာ ရှိတာကြောင့် ဗုဒ္ဓဟူးနံအထွက်ပြတယ်။ ခြေလေးချောင်း ထွက်တတ် ပျက်တတ်တယ်။ သေတတ်တယ်။ ဗုဒ္ဓဟူးနံ အတွက် ပူပင်သောက ရောက်ရတတ်တယ်။\nကြာသပတေးတန်းကပ်မှာ နေတာကြောင့်ဆရာသမား၊ ဘုရား၊ ကျောင်း၊ အိမ်အနီးမှာ ရှိတတ်တယ်။ မြေ, မြင်းမိန်းမ ကြာသပတေးနံ ဝင်တတ်တယ်။ ဝင်ရင် ဥပဒ်ပေးတတ်တယ်။ ချောင်းတသဲ့သဲ့ ဆိုးတဲ့ မိန်းမအိမ်ပေါ်မှာ ရှိတတ်တယ်။ ဆရာသမား ညအိပ်ည ရောက်လာတတ်တယ်။ နေအိမ်အနောက်ဘက်မှာ ဘုရားရှိရင်လဲ ရှိတတ်တယ်။ မုဆိုးမရင်လည်း နေတတ်တယ်။ မိတ်ဆွေ အပေါင်းအသင်း အကောက်ကြံတတ်တယ်။");
								
								
							}
							else {
								if (at3.getText().toString().equals("၀")) {
									dialog.setTitle("သုံးတန်ပေါ်နိစ်အဟော");
									dialog.setMessage("စနေအဝင် ပြတယ်။ စနေနံ ထီး၊ ဓား လက်ဆောင် ရမယ်။ ကောက်ရ မယ်။ ဝယ်ယူရရှိရင်လည်း ဈေးသက်သက်သာသာနှင့်ရမယ်။ စနေ ထီးက ထီးငယ်ဖြစ်တယ်။ အထိုက်အလျောက် အေးချမ်းတယ်။ အေးချမ်းမှီခိုရာ ရမယ်။\nတနင်္ဂနွေက ပြမှာရှိတာကြောင့် အိမ်ထောင်ဘက်က နိမ့်နေတတ် တယ်။ မိမိထက်အကြီး၊ - ချစ်သူအတွက် အပူ သင့်ရတတ်တယ်။ ဝမ်း၊ ရင် အန္တရာယ်ရတတ်တယ်။ ဦးခေါင်း အန္တရာယ်ရတတ်တယ်။ အိမ် ဟောင်းကို ပြင်ဆင်ရတတ်တယ်။\nတနင်္လာတိုင်ထိပ်မှာ နေတာကြောင့် အလှူဒါန ပြုရတတ်တယ်။ ခြေနှစ်ချောင်းဝင်မယ်။ ငွေရေးကြေးရေးအတွက် စောင်မ, ကြည့်ရှုရမယ့် သူပေါ်မယ်။ ရပ်ဝေးရောက် သားသမီး ပြန်လာတတ်တယ်၊ ကုန်ကူးသန်း ရောင်းဝယ်ရင် မြတ်စွန်းမယ်။\nအင်္ဂါတိုင်ခြေမှာ ရှိတာကြောင့် အရှက်တကွဲ အကျိုးနည်း ကိစ္စ ပေါ်ပေါက်တတ်တယ်။ ပြဿနာ ရှင်းရတတ်တယ်။ ခိုက်ရန် ဖြစ်တတ် တယ်။ သူတစ်ပါး အစွပ်အစွဲ ခံရတတ်တယ်။ သွေးထွက်သံယို ဖြစ်ကိန်း ရှိတယ်။\nဗုဒ္ဓဟူးအထက်နိစ်နေတာကြောင့် အိမ်မှာ ခြေလက် ထိခိုက်သူ ရှိမယ်။ ဗုဒ္ဓဟူးနံ အထွက်ပြတယ်။ အိမ်မှာ အိမ်ထောင်ပျက် ယောက်ျား ရှိတတ်တယ်။ အိမ်မှာ ဗုဒ္ဓဟူး သားသမီးရှိရင် ဝမ်းမှာ အနာပေးတတ် တယ်။ ငယ်ရွယ်သူရှိရင် ရေနစ်သေတတ်တယ်။\nကြာသပတေးအောက်နိစ်မှာရှိတာကြောင့် လင်ကွဲမယားကွဲကိန်း ရှိတတ်တယ်။ မြင်း၊ မိန်းမ စတဲ့ ကြာသပတေးနံ အိမ်ကထွက်တတ်တယ်။ မိတ်ပျက်တတ်တယ်။ ကြာသပတေးနံအတွက် အမှုသောက များမယ်။ တရားတဘောင် ဖြစ်တတ်တယ်။\nသောကြာ တန်းကပ် ဖြစ်တဲ့အတွက် ကျန်းမာရေး ညံ့မယ်။ ဝမ်း ရင် ဥပဒ် ရောက်တတ်တယ်။ မိမိအိမ်မှာ ဖြစ်ဖြစ်၊ အိမ်အနီးအနားမှာ ဖြစ်ဖြစ်၊ ရှူနာ၊ ပန်းနာ ရောဂါသည် ရှိတတ်တယ်။ မရှိရင် ခရုသင်းစွဲသူ ရှိတတ်တယ်။ မရှိရင် ယောက်ျားလျာ၊ မိန်းမလျာရှိမယ်။ သောကြာ သမီး၊ သောကြာသားကြောင့် စိတ်ဆင်းရဲ ကိုယ်ဆင်းရဲ ဖြစ်မယ်။ သောကြာနံ ပစ္စည်းကြောင့် ဘေးအန္တရာယ် ကြုံတွေ့ရတတ်တယ်။");
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _sun() {
		if (textview11.getText().toString().equals("တနင်္ဂနွေသက်ရောက်(ပဿံသာလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၆");
				at22.setText("၅");
				at33.setText("၄");
				at44.setText("၃");
				at55.setText("၂");
				at66.setText("၁");
				at77.setText("၀");
				py1.setText("၅");
				py2.setText("၄");
				py3.setText("၃");
				py4.setText("၂");
				py5.setText("၁");
				py6.setText("၀");
				py7.setText("၆");
				at1.setText("၆");
				at2.setText("၅");
				at3.setText("၄");
				at4.setText("၃");
				at5.setText("၂");
				at6.setText("၁");
				at7.setText("၀");
				py11.setText("၅");
				py22.setText("၄");
				py33.setText("၃");
				py44.setText("၂");
				py55.setText("၁");
				py66.setText("၀");
				py77.setText("၆");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at1.setText("၆");
					at2.setText("၅");
					at3.setText("၄");
					at4.setText("၃");
					at5.setText("၂");
					at6.setText("၁");
					at7.setText("၀");
					py1.setText("၀");
					py2.setText("၆");
					py3.setText("၅");
					py4.setText("၄");
					py5.setText("၃");
					py6.setText("၂");
					py7.setText("၁");
					at11.setText("၆");
					at22.setText("၅");
					at33.setText("၄");
					at44.setText("၃");
					at55.setText("၂");
					at66.setText("၁");
					at77.setText("၀");
					py11.setText("၀");
					py22.setText("၆");
					py33.setText("၅");
					py44.setText("၄");
					py55.setText("၃");
					py66.setText("၂");
					py77.setText("၁");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at1.setText("၆");
						at2.setText("၅");
						at3.setText("၄");
						at4.setText("၃");
						at5.setText("၂");
						at6.setText("၁");
						at7.setText("၀");
						py1.setText("၂");
						py2.setText("၁");
						py3.setText("၀");
						py4.setText("၆");
						py5.setText("၅");
						py6.setText("၄");
						py7.setText("၃");
						at11.setText("၆");
						at22.setText("၅");
						at33.setText("၄");
						at44.setText("၃");
						at55.setText("၂");
						at66.setText("၁");
						at77.setText("၀");
						py11.setText("၂");
						py22.setText("၁");
						py33.setText("၀");
						py44.setText("၆");
						py55.setText("၅");
						py66.setText("၄");
						py77.setText("၃");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at1.setText("၆");
							at2.setText("၅");
							at3.setText("၄");
							at4.setText("၃");
							at5.setText("၂");
							at6.setText("၁");
							at7.setText("၀");
							py1.setText("၄");
							py2.setText("၃");
							py3.setText("၂");
							py4.setText("၁");
							py5.setText("၀");
							py6.setText("၆");
							py7.setText("၅");
							at11.setText("၆");
							at22.setText("၅");
							at33.setText("၄");
							at44.setText("၃");
							at55.setText("၂");
							at66.setText("၁");
							at77.setText("၀");
							py11.setText("၄");
							py22.setText("၃");
							py33.setText("၂");
							py44.setText("၁");
							py55.setText("၀");
							py66.setText("၆");
							py77.setText("၅");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at1.setText("၆");
								at2.setText("၅");
								at3.setText("၄");
								at4.setText("၃");
								at5.setText("၂");
								at6.setText("၁");
								at7.setText("၀");
								py1.setText("၆");
								py2.setText("၅");
								py3.setText("၄");
								py4.setText("၃");
								py5.setText("၂");
								py6.setText("၁");
								py7.setText("၀");
								at11.setText("၆");
								at22.setText("၅");
								at33.setText("၄");
								at44.setText("၃");
								at55.setText("၂");
								at66.setText("၁");
								at77.setText("၀");
								py11.setText("၆");
								py22.setText("၅");
								py33.setText("၄");
								py44.setText("၃");
								py55.setText("၂");
								py66.setText("၁");
								py77.setText("၀");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at1.setText("၆");
									at2.setText("၅");
									at3.setText("၄");
									at4.setText("၃");
									at5.setText("၂");
									at6.setText("၁");
									at7.setText("၀");
									py1.setText("၁");
									py2.setText("၀");
									py3.setText("၆");
									py4.setText("၅");
									py5.setText("၄");
									py6.setText("၃");
									py7.setText("၂");
									at11.setText("၆");
									at22.setText("၅");
									at33.setText("၄");
									at44.setText("၃");
									at55.setText("၂");
									at66.setText("၁");
									at77.setText("၀");
									py11.setText("၁");
									py22.setText("၀");
									py33.setText("၆");
									py44.setText("၅");
									py55.setText("၄");
									py66.setText("၃");
									py77.setText("၂");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at1.setText("၆");
										at2.setText("၅");
										at3.setText("၄");
										at4.setText("၃");
										at5.setText("၂");
										at6.setText("၁");
										at7.setText("၀");
										py1.setText("၃");
										py2.setText("၂");
										py3.setText("၁");
										py4.setText("၀");
										py5.setText("၆");
										py6.setText("၅");
										py7.setText("၄");
										at11.setText("၆");
										at22.setText("၅");
										at33.setText("၄");
										at44.setText("၃");
										at55.setText("၂");
										at66.setText("၁");
										at77.setText("၀");
										py11.setText("၃");
										py22.setText("၂");
										py33.setText("၁");
										py44.setText("၀");
										py55.setText("၆");
										py66.setText("၅");
										py77.setText("၄");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_mon();
		}
	}
        function _mon() {
		if (textview11.getText().toString().equals("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၂");
				at22.setText("၁");
				at33.setText("၀");
				at44.setText("၆");
				at55.setText("၅");
				at66.setText("၄");
				at77.setText("၃");
				at1.setText("၂");
				at2.setText("၁");
				at3.setText("၀");
				at4.setText("၆");
				at5.setText("၅");
				at6.setText("၄");
				at7.setText("၃");
				py1.setText("၂");
				py2.setText("၁");
				py3.setText("၀");
				py4.setText("၆");
				py5.setText("၅");
				py6.setText("၄");
				py7.setText("၃");
				py11.setText("၂");
				py22.setText("၁");
				py33.setText("၀");
				py44.setText("၆");
				py55.setText("၅");
				py66.setText("၄");
				py77.setText("၃");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၂");
					at22.setText("၁");
					at33.setText("၀");
					at44.setText("၆");
					at55.setText("၅");
					at66.setText("၄");
					at77.setText("၃");
					at1.setText("၂");
					at2.setText("၁");
					at3.setText("၀");
					at4.setText("၆");
					at5.setText("၅");
					at6.setText("၄");
					at7.setText("၃");
					py1.setText("၄");
					py2.setText("၃");
					py3.setText("၂");
					py4.setText("၁");
					py5.setText("၀");
					py6.setText("၆");
					py7.setText("၅");
					py11.setText("၄");
					py22.setText("၃");
					py33.setText("၂");
					py44.setText("၁");
					py55.setText("၀");
					py66.setText("၆");
					py77.setText("၅");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ") && textview11.getText().toString().equals("တနင်္လာသက်ရောက်(လာဘောလောကဓံ)")) {
						at11.setText("၂");
						at22.setText("၁");
						at33.setText("၀");
						at44.setText("၆");
						at55.setText("၅");
						at66.setText("၄");
						at77.setText("၃");
						at1.setText("၂");
						at2.setText("၁");
						at3.setText("၀");
						at4.setText("၆");
						at5.setText("၅");
						at6.setText("၄");
						at7.setText("၃");
						py1.setText("၆");
						py2.setText("၅");
						py3.setText("၄");
						py4.setText("၃");
						py5.setText("၂");
						py6.setText("၁");
						py7.setText("၀");
						py11.setText("၆");
						py22.setText("၅");
						py33.setText("၄");
						py44.setText("၃");
						py55.setText("၂");
						py66.setText("၁");
						py77.setText("၀");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၂");
							at22.setText("၁");
							at33.setText("၀");
							at44.setText("၆");
							at55.setText("၅");
							at66.setText("၄");
							at77.setText("၃");
							at1.setText("၂");
							at2.setText("၁");
							at3.setText("၀");
							at4.setText("၆");
							at5.setText("၅");
							at6.setText("၄");
							at7.setText("၃");
							py1.setText("၁");
							py2.setText("၀");
							py3.setText("၆");
							py4.setText("၅");
							py5.setText("၄");
							py6.setText("၃");
							py7.setText("၂");
							py11.setText("၁");
							py22.setText("၀");
							py33.setText("၆");
							py44.setText("၅");
							py55.setText("၄");
							py66.setText("၃");
							py77.setText("၂");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၂");
								at22.setText("၁");
								at33.setText("၀");
								at44.setText("၆");
								at55.setText("၅");
								at66.setText("၄");
								at77.setText("၃");
								at1.setText("၂");
								at2.setText("၁");
								at3.setText("၀");
								at4.setText("၆");
								at5.setText("၅");
								at6.setText("၄");
								at7.setText("၃");
								py1.setText("၃");
								py2.setText("၂");
								py3.setText("၁");
								py4.setText("၀");
								py5.setText("၆");
								py6.setText("၅");
								py7.setText("၄");
								py11.setText("၃");
								py22.setText("၂");
								py33.setText("၁");
								py44.setText("၀");
								py55.setText("၆");
								py66.setText("၅");
								py77.setText("၄");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၂");
									at22.setText("၁");
									at33.setText("၀");
									at44.setText("၆");
									at55.setText("၅");
									at66.setText("၄");
									at77.setText("၃");
									at1.setText("၂");
									at2.setText("၁");
									at3.setText("၀");
									at4.setText("၆");
									at5.setText("၅");
									at6.setText("၄");
									at7.setText("၃");
									py1.setText("၅");
									py2.setText("၄");
									py3.setText("၃");
									py4.setText("၂");
									py5.setText("၁");
									py6.setText("၀");
									py7.setText("၆");
									py11.setText("၅");
									py22.setText("၄");
									py33.setText("၃");
									py44.setText("၂");
									py55.setText("၁");
									py66.setText("၀");
									py77.setText("၆");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၂");
										at22.setText("၁");
										at33.setText("၀");
										at44.setText("၆");
										at55.setText("၅");
										at66.setText("၄");
										at77.setText("၃");
										at1.setText("၂");
										at2.setText("၁");
										at3.setText("၀");
										at4.setText("၆");
										at5.setText("၅");
										at6.setText("၄");
										at7.setText("၃");
										py1.setText("၀");
										py2.setText("၆");
										py3.setText("၅");
										py4.setText("၄");
										py5.setText("၃");
										py6.setText("၂");
										py7.setText("၁");
										py11.setText("၀");
										py22.setText("၆");
										py33.setText("၅");
										py44.setText("၄");
										py55.setText("၃");
										py66.setText("၂");
										py77.setText("၁");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_tuewed();
		}
	}
        function _tuewed() {
		if (textview11.getText().toString().equals("အင်္ဂါသက်ရောက်(အယသောလောကဓံ)") || textview11.getText().toString().equals("ဗုဒ္ဓဟူးသက်ရောက်(ဒုက္ခံလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၀");
				at22.setText("၆");
				at33.setText("၅");
				at44.setText("၄");
				at55.setText("၃");
				at66.setText("၂");
				at77.setText("၁");
				at1.setText("၀");
				at2.setText("၆");
				at3.setText("၅");
				at4.setText("၄");
				at5.setText("၃");
				at6.setText("၂");
				at7.setText("၁");
				py1.setText("၄");
				py2.setText("၃");
				py3.setText("၂");
				py4.setText("၁");
				py5.setText("၀");
				py6.setText("၆");
				py7.setText("၅");
				py11.setText("၄");
				py22.setText("၃");
				py33.setText("၂");
				py44.setText("၁");
				py55.setText("၀");
				py66.setText("၆");
				py77.setText("၅");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၀");
					at22.setText("၆");
					at33.setText("၅");
					at44.setText("၄");
					at55.setText("၃");
					at66.setText("၂");
					at77.setText("၁");
					at1.setText("၀");
					at2.setText("၆");
					at3.setText("၅");
					at4.setText("၄");
					at5.setText("၃");
					at6.setText("၂");
					at7.setText("၁");
					py1.setText("၆");
					py2.setText("၅");
					py3.setText("၄");
					py4.setText("၃");
					py5.setText("၂");
					py6.setText("၁");
					py7.setText("၀");
					py11.setText("၆");
					py22.setText("၅");
					py33.setText("၄");
					py44.setText("၃");
					py55.setText("၂");
					py66.setText("၁");
					py77.setText("၀");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at11.setText("၀");
						at22.setText("၆");
						at33.setText("၅");
						at44.setText("၄");
						at55.setText("၃");
						at66.setText("၂");
						at77.setText("၁");
						at1.setText("၀");
						at2.setText("၆");
						at3.setText("၅");
						at4.setText("၄");
						at5.setText("၃");
						at6.setText("၂");
						at7.setText("၁");
						py1.setText("၁");
						py2.setText("၀");
						py3.setText("၆");
						py4.setText("၅");
						py5.setText("၄");
						py6.setText("၃");
						py7.setText("၂");
						py11.setText("၁");
						py22.setText("၀");
						py33.setText("၆");
						py44.setText("၅");
						py55.setText("၄");
						py66.setText("၃");
						py77.setText("၂");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၀");
							at22.setText("၆");
							at33.setText("၅");
							at44.setText("၄");
							at55.setText("၃");
							at66.setText("၂");
							at77.setText("၁");
							at1.setText("၀");
							at2.setText("၆");
							at3.setText("၅");
							at4.setText("၄");
							at5.setText("၃");
							at6.setText("၂");
							at7.setText("၁");
							py1.setText("၃");
							py2.setText("၂");
							py3.setText("၁");
							py4.setText("၀");
							py5.setText("၆");
							py6.setText("၅");
							py7.setText("၄");
							py11.setText("၃");
							py22.setText("၂");
							py33.setText("၁");
							py44.setText("၀");
							py55.setText("၆");
							py66.setText("၅");
							py77.setText("၄");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၀");
								at22.setText("၆");
								at33.setText("၅");
								at44.setText("၄");
								at55.setText("၃");
								at66.setText("၂");
								at77.setText("၁");
								at1.setText("၀");
								at2.setText("၆");
								at3.setText("၅");
								at4.setText("၄");
								at5.setText("၃");
								at6.setText("၂");
								at7.setText("၁");
								py1.setText("၅");
								py2.setText("၄");
								py3.setText("၃");
								py4.setText("၂");
								py5.setText("၁");
								py6.setText("၀");
								py7.setText("၆");
								py11.setText("၅");
								py22.setText("၄");
								py33.setText("၃");
								py44.setText("၂");
								py55.setText("၁");
								py66.setText("၀");
								py77.setText("၆");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၀");
									at22.setText("၆");
									at33.setText("၅");
									at44.setText("၄");
									at55.setText("၃");
									at66.setText("၂");
									at77.setText("၁");
									at1.setText("၀");
									at2.setText("၆");
									at3.setText("၅");
									at4.setText("၄");
									at5.setText("၃");
									at6.setText("၂");
									at7.setText("၁");
									py1.setText("၀");
									py2.setText("၆");
									py3.setText("၅");
									py4.setText("၄");
									py5.setText("၃");
									py6.setText("၂");
									py7.setText("၁");
									py11.setText("၀");
									py22.setText("၆");
									py33.setText("၅");
									py44.setText("၄");
									py55.setText("၃");
									py66.setText("၂");
									py77.setText("၁");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၀");
										at22.setText("၆");
										at33.setText("၅");
										at44.setText("၄");
										at55.setText("၃");
										at66.setText("၂");
										at77.setText("၁");
										at1.setText("၀");
										at2.setText("၆");
										at3.setText("၅");
										at4.setText("၄");
										at5.setText("၃");
										at6.setText("၂");
										at7.setText("၁");
										py1.setText("၂");
										py2.setText("၁");
										py3.setText("၀");
										py4.setText("၆");
										py5.setText("၅");
										py6.setText("၄");
										py7.setText("၃");
										py11.setText("၂");
										py22.setText("၁");
										py33.setText("၀");
										py44.setText("၆");
										py55.setText("၅");
										py66.setText("၄");
										py77.setText("၃");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_thurs();
		}
	}
        function _thurs() {
		if (textview11.getText().toString().equals("ကြာသပတေးသက်ရောက်(အလာဘောလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၃");
				at22.setText("၂");
				at33.setText("၁");
				at44.setText("၀");
				at55.setText("၆");
				at66.setText("၅");
				at77.setText("၄");
				at1.setText("၃");
				at2.setText("၂");
				at3.setText("၁");
				at4.setText("၀");
				at5.setText("၆");
				at6.setText("၅");
				at7.setText("၄");
				py1.setText("၁");
				py2.setText("၀");
				py3.setText("၆");
				py4.setText("၅");
				py5.setText("၄");
				py6.setText("၃");
				py7.setText("၂");
				py11.setText("၁");
				py22.setText("၀");
				py33.setText("၆");
				py44.setText("၅");
				py55.setText("၄");
				py66.setText("၃");
				py77.setText("၂");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၃");
					at22.setText("၂");
					at33.setText("၁");
					at44.setText("၀");
					at55.setText("၆");
					at66.setText("၅");
					at77.setText("၄");
					at1.setText("၃");
					at2.setText("၂");
					at3.setText("၁");
					at4.setText("၀");
					at5.setText("၆");
					at6.setText("၅");
					at7.setText("၄");
					py1.setText("၃");
					py2.setText("၂");
					py3.setText("၁");
					py4.setText("၀");
					py5.setText("၆");
					py6.setText("၅");
					py7.setText("၄");
					py11.setText("၃");
					py22.setText("၂");
					py33.setText("၁");
					py44.setText("၀");
					py55.setText("၆");
					py66.setText("၅");
					py77.setText("၄");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at11.setText("၃");
						at22.setText("၂");
						at33.setText("၁");
						at44.setText("၀");
						at55.setText("၆");
						at66.setText("၅");
						at77.setText("၄");
						at1.setText("၃");
						at2.setText("၂");
						at3.setText("၁");
						at4.setText("၀");
						at5.setText("၆");
						at6.setText("၅");
						at7.setText("၄");
						py1.setText("၅");
						py2.setText("၄");
						py3.setText("၃");
						py4.setText("၂");
						py5.setText("၁");
						py6.setText("၀");
						py7.setText("၆");
						py11.setText("၅");
						py22.setText("၄");
						py33.setText("၃");
						py44.setText("၂");
						py55.setText("၁");
						py66.setText("၀");
						py77.setText("၆");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၃");
							at22.setText("၂");
							at33.setText("၁");
							at44.setText("၀");
							at55.setText("၆");
							at66.setText("၅");
							at77.setText("၄");
							at1.setText("၃");
							at2.setText("၂");
							at3.setText("၁");
							at4.setText("၀");
							at5.setText("၆");
							at6.setText("၅");
							at7.setText("၄");
							py1.setText("၀");
							py2.setText("၆");
							py3.setText("၅");
							py4.setText("၄");
							py5.setText("၃");
							py6.setText("၂");
							py7.setText("၁");
							py11.setText("၀");
							py22.setText("၆");
							py33.setText("၅");
							py44.setText("၄");
							py55.setText("၃");
							py66.setText("၂");
							py77.setText("၁");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၃");
								at22.setText("၂");
								at33.setText("၁");
								at44.setText("၀");
								at55.setText("၆");
								at66.setText("၅");
								at77.setText("၄");
								at1.setText("၃");
								at2.setText("၂");
								at3.setText("၁");
								at4.setText("၀");
								at5.setText("၆");
								at6.setText("၅");
								at7.setText("၄");
								py1.setText("၂");
								py2.setText("၁");
								py3.setText("၀");
								py4.setText("၆");
								py5.setText("၅");
								py6.setText("၄");
								py7.setText("၃");
								py11.setText("၂");
								py22.setText("၁");
								py33.setText("၀");
								py44.setText("၆");
								py55.setText("၅");
								py66.setText("၄");
								py77.setText("၃");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၃");
									at22.setText("၂");
									at33.setText("၁");
									at44.setText("၀");
									at55.setText("၆");
									at66.setText("၅");
									at77.setText("၄");
									at1.setText("၃");
									at2.setText("၂");
									at3.setText("၁");
									at4.setText("၀");
									at5.setText("၆");
									at6.setText("၅");
									at7.setText("၄");
									py1.setText("၄");
									py2.setText("၃");
									py3.setText("၂");
									py4.setText("၁");
									py5.setText("၀");
									py6.setText("၆");
									py7.setText("၅");
									py11.setText("၄");
									py22.setText("၃");
									py33.setText("၂");
									py44.setText("၁");
									py55.setText("၀");
									py66.setText("၆");
									py77.setText("၅");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၃");
										at22.setText("၂");
										at33.setText("၁");
										at44.setText("၀");
										at55.setText("၆");
										at66.setText("၅");
										at77.setText("၄");
										at1.setText("၃");
										at2.setText("၂");
										at3.setText("၁");
										at4.setText("၀");
										at5.setText("၆");
										at6.setText("၅");
										at7.setText("၄");
										py1.setText("၆");
										py2.setText("၅");
										py3.setText("၄");
										py4.setText("၃");
										py5.setText("၂");
										py6.setText("၁");
										py7.setText("၀");
										py11.setText("၆");
										py22.setText("၅");
										py33.setText("၄");
										py44.setText("၃");
										py55.setText("၂");
										py66.setText("၁");
										py77.setText("၀");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_fri();
		}
	}
        function _fri() {
		if (textview11.getText().toString().equals("သောကြာသက်ရောက်(သုခံလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at1.setText("၅");
				at2.setText("၄");
				at3.setText("၃");
				at4.setText("၂");
				at5.setText("၁");
				at6.setText("၀");
				at7.setText("၆");
				py1.setText("၆");
				py2.setText("၅");
				py3.setText("၄");
				py4.setText("၃");
				py5.setText("၂");
				py6.setText("၁");
				py7.setText("၀");
				py11.setText("၆");
				py22.setText("၅");
				py33.setText("၄");
				py44.setText("၃");
				py55.setText("၂");
				py66.setText("၁");
				py77.setText("၀");
				at11.setText("၅");
				at22.setText("၄");
				at33.setText("၃");
				at44.setText("၂");
				at55.setText("၁");
				at66.setText("၀");
				at77.setText("၆");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၅");
					at22.setText("၄");
					at33.setText("၃");
					at44.setText("၂");
					at55.setText("၁");
					at66.setText("၀");
					at77.setText("၆");
					at1.setText("၅");
					at2.setText("၄");
					at3.setText("၃");
					at4.setText("၂");
					at5.setText("၁");
					at6.setText("၀");
					at7.setText("၆");
					py1.setText("၁");
					py2.setText("၀");
					py3.setText("၆");
					py4.setText("၅");
					py5.setText("၄");
					py6.setText("၃");
					py7.setText("၂");
					py11.setText("၁");
					py22.setText("၀");
					py33.setText("၆");
					py44.setText("၅");
					py55.setText("၄");
					py66.setText("၃");
					py77.setText("၂");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at11.setText("၅");
						at22.setText("၄");
						at33.setText("၃");
						at44.setText("၂");
						at55.setText("၁");
						at66.setText("၀");
						at77.setText("၆");
						at1.setText("၅");
						at2.setText("၄");
						at3.setText("၃");
						at4.setText("၂");
						at5.setText("၁");
						at6.setText("၀");
						at7.setText("၆");
						py1.setText("၃");
						py2.setText("၂");
						py3.setText("၁");
						py4.setText("၀");
						py5.setText("၆");
						py6.setText("၅");
						py7.setText("၄");
						py11.setText("၃");
						py22.setText("၂");
						py33.setText("၁");
						py44.setText("၀");
						py55.setText("၆");
						py66.setText("၅");
						py77.setText("၄");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၅");
							at22.setText("၄");
							at33.setText("၃");
							at44.setText("၂");
							at55.setText("၁");
							at66.setText("၀");
							at77.setText("၆");
							at1.setText("၅");
							at2.setText("၄");
							at3.setText("၃");
							at4.setText("၂");
							at5.setText("၁");
							at6.setText("၀");
							at7.setText("၆");
							py1.setText("၅");
							py2.setText("၄");
							py3.setText("၃");
							py4.setText("၂");
							py5.setText("၁");
							py6.setText("၀");
							py7.setText("၆");
							py11.setText("၅");
							py22.setText("၄");
							py33.setText("၃");
							py44.setText("၂");
							py55.setText("၁");
							py66.setText("၀");
							py77.setText("၆");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၅");
								at22.setText("၄");
								at33.setText("၃");
								at44.setText("၂");
								at55.setText("၁");
								at66.setText("၀");
								at77.setText("၆");
								at1.setText("၅");
								at2.setText("၄");
								at3.setText("၃");
								at4.setText("၂");
								at5.setText("၁");
								at6.setText("၀");
								at7.setText("၆");
								py1.setText("၀");
								py2.setText("၆");
								py3.setText("၅");
								py4.setText("၄");
								py5.setText("၃");
								py6.setText("၂");
								py7.setText("၁");
								py11.setText("၀");
								py22.setText("၆");
								py33.setText("၅");
								py44.setText("၄");
								py55.setText("၃");
								py66.setText("၂");
								py77.setText("၁");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၅");
									at22.setText("၄");
									at33.setText("၃");
									at44.setText("၂");
									at55.setText("၁");
									at66.setText("၀");
									at77.setText("၆");
									at1.setText("၅");
									at2.setText("၄");
									at3.setText("၃");
									at4.setText("၂");
									at5.setText("၁");
									at6.setText("၀");
									at7.setText("၆");
									py1.setText("၂");
									py2.setText("၁");
									py3.setText("၀");
									py4.setText("၆");
									py5.setText("၅");
									py6.setText("၄");
									py7.setText("၃");
									py11.setText("၂");
									py22.setText("၁");
									py33.setText("၀");
									py44.setText("၆");
									py55.setText("၅");
									py66.setText("၄");
									py77.setText("၃");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၅");
										at22.setText("၄");
										at33.setText("၃");
										at44.setText("၂");
										at55.setText("၁");
										at66.setText("၀");
										at77.setText("၆");
										at1.setText("၅");
										at2.setText("၄");
										at3.setText("၃");
										at4.setText("၂");
										at5.setText("၁");
										at6.setText("၀");
										at7.setText("၆");
										py1.setText("၄");
										py2.setText("၃");
										py3.setText("၂");
										py4.setText("၁");
										py5.setText("၀");
										py6.setText("၆");
										py7.setText("၅");
										py11.setText("၄");
										py22.setText("၃");
										py33.setText("၂");
										py44.setText("၁");
										py55.setText("၀");
										py66.setText("၆");
										py77.setText("၅");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_sat();
		}
	}
        function _sat() {
		if (textview11.getText().toString().equals("စနေသက်ရောက်(နိဒ္ဓါလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၁");
				at22.setText("၀");
				at33.setText("၆");
				at44.setText("၅");
				at55.setText("၄");
				at66.setText("၃");
				at77.setText("၂");
				at1.setText("၁");
				at2.setText("၀");
				at3.setText("၆");
				at4.setText("၅");
				at5.setText("၄");
				at6.setText("၃");
				at7.setText("၂");
				py1.setText("၃");
				py2.setText("၂");
				py3.setText("၁");
				py4.setText("၀");
				py5.setText("၆");
				py6.setText("၅");
				py7.setText("၄");
				py11.setText("၃");
				py22.setText("၂");
				py33.setText("၁");
				py44.setText("၀");
				py55.setText("၆");
				py66.setText("၅");
				py77.setText("၄");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၁");
					at22.setText("၀");
					at33.setText("၆");
					at44.setText("၅");
					at55.setText("၄");
					at66.setText("၃");
					at77.setText("၂");
					at1.setText("၁");
					at2.setText("၀");
					at3.setText("၆");
					at4.setText("၅");
					at5.setText("၄");
					at6.setText("၃");
					at7.setText("၂");
					py1.setText("၅");
					py2.setText("၄");
					py3.setText("၃");
					py4.setText("၂");
					py5.setText("၁");
					py6.setText("၀");
					py7.setText("၆");
					py11.setText("၅");
					py22.setText("၄");
					py33.setText("၃");
					py44.setText("၂");
					py55.setText("၁");
					py66.setText("၀");
					py77.setText("၆");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at11.setText("၁");
						at22.setText("၀");
						at33.setText("၆");
						at44.setText("၅");
						at55.setText("၄");
						at66.setText("၃");
						at77.setText("၂");
						at1.setText("၁");
						at2.setText("၀");
						at3.setText("၆");
						at4.setText("၅");
						at5.setText("၄");
						at6.setText("၃");
						at7.setText("၂");
						py1.setText("၀");
						py2.setText("၆");
						py3.setText("၅");
						py4.setText("၄");
						py5.setText("၃");
						py6.setText("၂");
						py7.setText("၁");
						py11.setText("၀");
						py22.setText("၆");
						py33.setText("၅");
						py44.setText("၄");
						py55.setText("၃");
						py66.setText("၂");
						py77.setText("၁");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၁");
							at22.setText("၀");
							at33.setText("၆");
							at44.setText("၅");
							at55.setText("၄");
							at66.setText("၃");
							at77.setText("၂");
							at1.setText("၁");
							at2.setText("၀");
							at3.setText("၆");
							at4.setText("၅");
							at5.setText("၄");
							at6.setText("၃");
							at7.setText("၂");
							py1.setText("၂");
							py2.setText("၁");
							py3.setText("၀");
							py4.setText("၆");
							py5.setText("၅");
							py6.setText("၄");
							py7.setText("၃");
							py11.setText("၂");
							py22.setText("၁");
							py33.setText("၀");
							py44.setText("၆");
							py55.setText("၅");
							py66.setText("၄");
							py77.setText("၃");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၁");
								at22.setText("၀");
								at33.setText("၆");
								at44.setText("၅");
								at55.setText("၄");
								at66.setText("၃");
								at77.setText("၂");
								at1.setText("၁");
								at2.setText("၀");
								at3.setText("၆");
								at4.setText("၅");
								at5.setText("၄");
								at6.setText("၃");
								at7.setText("၂");
								py1.setText("၄");
								py2.setText("၃");
								py3.setText("၂");
								py4.setText("၁");
								py5.setText("၀");
								py6.setText("၆");
								py7.setText("၅");
								py11.setText("၄");
								py22.setText("၃");
								py33.setText("၂");
								py44.setText("၁");
								py55.setText("၀");
								py66.setText("၆");
								py77.setText("၅");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၁");
									at22.setText("၀");
									at33.setText("၆");
									at44.setText("၅");
									at55.setText("၄");
									at66.setText("၃");
									at77.setText("၂");
									at1.setText("၁");
									at2.setText("၀");
									at3.setText("၆");
									at4.setText("၅");
									at5.setText("၄");
									at6.setText("၃");
									at7.setText("၂");
									py1.setText("၆");
									py2.setText("၅");
									py3.setText("၄");
									py4.setText("၃");
									py5.setText("၂");
									py6.setText("၁");
									py7.setText("၀");
									py11.setText("၆");
									py22.setText("၅");
									py33.setText("၄");
									py44.setText("၃");
									py55.setText("၂");
									py66.setText("၁");
									py77.setText("၀");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၁");
										at22.setText("၀");
										at33.setText("၆");
										at44.setText("၅");
										at55.setText("၄");
										at66.setText("၃");
										at77.setText("၂");
										at1.setText("၁");
										at2.setText("၀");
										at3.setText("၆");
										at4.setText("၅");
										at5.setText("၄");
										at6.setText("၃");
										at7.setText("၂");
										py1.setText("၁");
										py2.setText("၀");
										py3.setText("၆");
										py4.setText("၅");
										py5.setText("၄");
										py6.setText("၃");
										py7.setText("၂");
										py11.setText("၁");
										py22.setText("၀");
										py33.setText("၆");
										py44.setText("၅");
										py55.setText("၄");
										py66.setText("၃");
										py77.setText("၂");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_rahu();
		}
	}
        function _rahu() {
		if (textview11.getText().toString().equals("ရာဟုသက်ရောက်(ယသောလောကဓံ)")) {
			if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
				at11.setText("၄");
				at22.setText("၃");
				at33.setText("၂");
				at44.setText("၁");
				at55.setText("၀");
				at66.setText("၆");
				at77.setText("၅");
				at1.setText("၄");
				at2.setText("၃");
				at3.setText("၂");
				at4.setText("၁");
				at5.setText("၀");
				at6.setText("၆");
				at7.setText("၅");
				py1.setText("၀");
				py2.setText("၆");
				py3.setText("၅");
				py4.setText("၄");
				py5.setText("၃");
				py6.setText("၂");
				py7.setText("၁");
				py11.setText("၀");
				py22.setText("၆");
				py33.setText("၅");
				py44.setText("၄");
				py55.setText("၃");
				py66.setText("၂");
				py77.setText("၁");
			}
			else {
				if (mmm.getText().toString().equals("တနင်္လာ")) {
					at11.setText("၄");
					at22.setText("၃");
					at33.setText("၂");
					at44.setText("၁");
					at55.setText("၀");
					at66.setText("၆");
					at77.setText("၅");
					at1.setText("၄");
					at2.setText("၃");
					at3.setText("၂");
					at4.setText("၁");
					at5.setText("၀");
					at6.setText("၆");
					at7.setText("၅");
					py1.setText("၂");
					py2.setText("၁");
					py3.setText("၀");
					py4.setText("၆");
					py5.setText("၅");
					py6.setText("၄");
					py7.setText("၃");
					py11.setText("၂");
					py22.setText("၁");
					py33.setText("၀");
					py44.setText("၆");
					py55.setText("၅");
					py66.setText("၄");
					py77.setText("၃");
				}
				else {
					if (mmm.getText().toString().equals("အင်္ဂါ")) {
						at11.setText("၄");
						at22.setText("၃");
						at33.setText("၂");
						at44.setText("၁");
						at55.setText("၀");
						at66.setText("၆");
						at77.setText("၅");
						at1.setText("၄");
						at2.setText("၃");
						at3.setText("၂");
						at4.setText("၁");
						at5.setText("၀");
						at6.setText("၆");
						at7.setText("၅");
						py1.setText("၄");
						py2.setText("၃");
						py3.setText("၂");
						py4.setText("၁");
						py5.setText("၀");
						py6.setText("၆");
						py7.setText("၅");
						py11.setText("၄");
						py22.setText("၃");
						py33.setText("၂");
						py44.setText("၁");
						py55.setText("၀");
						py66.setText("၆");
						py77.setText("၅");
					}
					else {
						if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
							at11.setText("၄");
							at22.setText("၃");
							at33.setText("၂");
							at44.setText("၁");
							at55.setText("၀");
							at66.setText("၆");
							at77.setText("၅");
							at1.setText("၄");
							at2.setText("၃");
							at3.setText("၂");
							at4.setText("၁");
							at5.setText("၀");
							at6.setText("၆");
							at7.setText("၅");
							py1.setText("၆");
							py2.setText("၅");
							py3.setText("၄");
							py4.setText("၃");
							py5.setText("၂");
							py6.setText("၁");
							py7.setText("၀");
							py11.setText("၆");
							py22.setText("၅");
							py33.setText("၄");
							py44.setText("၃");
							py55.setText("၂");
							py66.setText("၁");
							py77.setText("၀");
						}
						else {
							if (mmm.getText().toString().equals("ကြာသပတေး")) {
								at11.setText("၄");
								at22.setText("၃");
								at33.setText("၂");
								at44.setText("၁");
								at55.setText("၀");
								at66.setText("၆");
								at77.setText("၅");
								at1.setText("၄");
								at2.setText("၃");
								at3.setText("၂");
								at4.setText("၁");
								at5.setText("၀");
								at6.setText("၆");
								at7.setText("၅");
								py1.setText("၁");
								py2.setText("၀");
								py3.setText("၆");
								py4.setText("၅");
								py5.setText("၄");
								py6.setText("၃");
								py7.setText("၂");
								py11.setText("၁");
								py22.setText("၀");
								py33.setText("၆");
								py44.setText("၅");
								py55.setText("၄");
								py66.setText("၃");
								py77.setText("၂");
							}
							else {
								if (mmm.getText().toString().equals("သောကြာ")) {
									at11.setText("၄");
									at22.setText("၃");
									at33.setText("၂");
									at44.setText("၁");
									at55.setText("၀");
									at66.setText("၆");
									at77.setText("၅");
									at1.setText("၄");
									at2.setText("၃");
									at3.setText("၂");
									at4.setText("၁");
									at5.setText("၀");
									at6.setText("၆");
									at7.setText("၅");
									py1.setText("၃");
									py2.setText("၂");
									py3.setText("၁");
									py4.setText("၀");
									py5.setText("၆");
									py6.setText("၅");
									py7.setText("၄");
									py11.setText("၃");
									py22.setText("၂");
									py33.setText("၁");
									py44.setText("၀");
									py55.setText("၆");
									py66.setText("၅");
									py77.setText("၄");
								}
								else {
									if (mmm.getText().toString().equals("စနေ")) {
										at11.setText("၄");
										at22.setText("၃");
										at33.setText("၂");
										at44.setText("၁");
										at55.setText("၀");
										at66.setText("၆");
										at77.setText("၅");
										at1.setText("၄");
										at2.setText("၃");
										at3.setText("၂");
										at4.setText("၁");
										at5.setText("၀");
										at6.setText("၆");
										at7.setText("၅");
										py1.setText("၅");
										py2.setText("၄");
										py3.setText("၃");
										py4.setText("၂");
										py7.setText("၁");
										py5.setText("၀");
										py6.setText("၆");
										py11.setText("၅");
										py22.setText("၄");
										py33.setText("၃");
										py44.setText("၂");
										py55.setText("၁");
										py66.setText("၀");
										py77.setText("၆");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			
		}
	}
        function _twt() {
		if (textview182.getText().toString().equals("Sunday")) {
			mmm.setText("တနင်္ဂနွေ");
		}
		else {
			if (textview182.getText().toString().equals("Monday")) {
				mmm.setText("တနင်္လာ");
			}
			else {
				if (textview182.getText().toString().equals("Tuesday")) {
					mmm.setText("အင်္ဂါ");
				}
				else {
					if (textview182.getText().toString().equals("Wednesday")) {
						mmm.setText("ဗုဒ္ဓဟူး");
					}
					else {
						if (textview182.getText().toString().equals("Thursday")) {
							mmm.setText("ကြာသပတေး");
						}
						else {
							if (textview182.getText().toString().equals("Friday")) {
								mmm.setText("သောကြာ");
							}
							else {
								if (textview182.getText().toString().equals("Saturday")) {
									mmm.setText("စနေ");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
			html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> ပရိဝါရ<br>ကတ္တု<br>မွေးနံ</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>အာယု<br>သာမိ<br>အညွန့်<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>နာဂရ<br>သမ္ပဒါန<br>တြိရန်း<br>&nbsp;&nbsp;အပြင်ရန်&nbsp;&nbsp;</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>ဌာန<br>ဩကာသ<br>ဆပွတ်<br>အတွင်းမိတ်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>ဘုမ္မိ<br>ကမ္မ<br>စတုရန်း<br>ဓာတ်ရန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> သီရိ<br>အလမ္ပန<br>စတုရန်း</th>\n                <th><font color=\"red\">၅ တေး</font><br>တေဇ<br>အပါဒါန<br>ပဉ္စပွတ်<br>&nbsp;အပြင်မိတ်&nbsp;</th>\n                <th><font color=\"red\">စနေ</font><br>ဂဟပတိ<br>ကရဏ<br>အမြစ်<br>ဓာတ်မိတ်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">တနင်္ဂနွေသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>\n";
			
			captureAhta(html);
			m1.setText("၅");
			m2.setText("၂");
			m3.setText("၆");
			m4.setText("၁");
			m5.setText("၄");
			m6.setText("၀");
			m7.setText("၃");
			mm1.setText("၅");
			mm2.setText("၂");
			mm3.setText("၆");
			mm4.setText("၁");
			mm5.setText("၄");
			mm6.setText("၀");
			mm7.setText("၃");
		}
		else {
			if (mmm.getText().toString().equals("တနင်္လာ")) {
				html = "<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> သီရိ<br>အလမ္ပန<br>အမြစ်<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>ပရိဝါရ<br>ကတ္တု<br>မွေးနံ<br>&nbsp;&nbsp;&nbsp;ဥဒါသိန်&nbsp;&nbsp;&nbsp;</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>အာယု<br>သာမိ<br>အညွန့်<br>ဓာတ်ရန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>ဌာန<br>ဩကာသ<br>ပဉ္စပွတ်<br>အတွင်းရန်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>နာဂရ<br>သမ္ပဒါန<br>တြိရန်း<br>အပြင်မိတ်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> တေဇ<br>အပါဒါန<br>တြိရန်း<br>အတွင်းမိတ်</th>\n                <th><font color=\"red\">၅ တေး</font><br>ဂဟပတိ<br>ကရဏ<br>စတုရန်း<br>အပြင်ရန်<br>ဓာတ်မိတ်</th>\n                <th><font color=\"red\">စနေ</font><br>ဘုမ္မိ<br>ကမ္မ<br>ဆပွတ်<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">တနင်္လာသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
				
				captureAhta(html);
				m1.setText("၆");
				m2.setText("၃");
				m3.setText("၀");
				m4.setText("၂");
				m5.setText("၅");
				m6.setText("၁");
				m7.setText("၄");
				mm1.setText("၆");
				mm2.setText("၃");
				mm3.setText("၀");
				mm4.setText("၂");
				mm5.setText("၅");
				mm6.setText("၁");
				mm7.setText("၄");
			}
			else {
				if (mmm.getText().toString().equals("အင်္ဂါ")) {
					html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> ဌာန<br>ဩကာသ<br>ဆပွတ်<br>အပြင်ရန်</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>သီရိ<br>အလမ္ပန<br>အမြစ်<br>ဓာတ်ရန်</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>ပရိဝါရ<br>ကတ္တု<br>မွေးနံ<br>&nbsp;&nbsp;ဥဒါသိန်&nbsp;&nbsp;</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>တေဇ<br>အပါဒါန<br>စတုရန်း<br>အပြင်မိတ်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>အာယု<br>သာမိ<br>အညွန့်<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> ဂဟပတိ<br>ကရဏ<br>အညွန့်<br>ဓာတ်မိတ်<br>အတွင်းရန်</th>\n                <th><font color=\"red\">၅ တေး</font><br>ဘုမ္မိ<br>ကမ္မ<br>တြိရန်း<br>အတွင်းမိတ်</th>\n                <th><font color=\"red\">စနေ</font><br>နာဂရ<br>သမ္ပ​ဒါန<br>ပဉ္စပွတ်<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">အင်္ဂါသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
					
					captureAhta(html);
					m1.setText("၀");
					m2.setText("၄");
					m3.setText("၁");
					m4.setText("၃");
					m5.setText("၆");
					m6.setText("၂");
					m7.setText("၅");
					mm1.setText("၀");
					mm2.setText("၄");
					mm3.setText("၁");
					mm4.setText("၃");
					mm5.setText("၆");
					mm6.setText("၂");
					mm7.setText("၅");
				}
				else {
					if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
						html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> တေဇ<br>အပါဒါန<br>ပဉ္စပွတ်<br>ဓာတ်ရန်<br>&nbsp;&nbsp;အတွင်းရန်&nbsp;&nbsp;</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>ဌာန<br>ဩကာသ<br>ဆပွတ်<br>&nbsp;&nbsp;အပြင်မိတ်&nbsp;&nbsp;</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>သီရိ<br>အလမ္ပန<br>အမြစ်<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>ဂဟပတိ<br>ကရဏ<br>​​တြိရန်း<br>အပြင်မိတ်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>ပရိဝါရ<br>ကတ္တု<br>မွေးနံ<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> ဘုမ္မိ<br>ကမ္မ<br>ဓာတ်မိတ်<br>အပြင်ရန်</th>\n                <th><font color=\"red\">၅ တေး</font><br>နာဂရ<br>သမ္ပဒါန<br>အညွန့်<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">စနေ</font><br>အာယု<br>သာမိ<br>စတုရန်း<br>အတွင်းမိတ်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">ဗုဒ္ဓဟူးသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
						
						captureAhta(html);
						m1.setText("၁");
						m2.setText("၅");
						m3.setText("၂");
						m4.setText("၄");
						m5.setText("၀");
						m6.setText("၃");
						m7.setText("၆");
						mm1.setText("၁");
						mm2.setText("၅");
						mm3.setText("၂");
						mm4.setText("၄");
						mm5.setText("၀");
						mm6.setText("၃");
						mm7.setText("၆");
					}
					else {
						if (mmm.getText().toString().equals("ကြာသပတေး")) {
							html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> ဘုမ္မိ<br>ကမ္မ<br>စတုရန်း<br>&nbsp;&nbsp;အပြင်မိတ်&nbsp;&nbsp;</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>&nbsp;&nbsp;&nbsp;&nbsp;ဂဟပတိ&nbsp;&nbsp;&nbsp;&nbsp;<br>ကရဏ<br>​​ပဉ္စပွတ်<br>အပြင်ရန်<br>ဓာတ်မိတ်</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>တေဇ<br>အပါဒါန<br>ဆပွတ်<br>အတွင်းမိတ်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>နာဂရ<br>သမ္ပဒါန<br>အညွန့်<br>ဥဒါသိန်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>ဌာန<br>ဩကာသ<br>အမြစ်<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> အာယု<br>သာမိ<br>အမြစ်<br>ဓာတ်ရန်</th>\n                <th><font color=\"red\">၅ တေး</font><br>ပရိဝါရ<br>ကတ္တု<br>မွေးနံ<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">စနေ</font><br>သီရိ<br>အလမ္ပန<br>တြိရန်း<br>အတွင်းရန်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">ကြာသပ​တေးသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
							
							captureAhta(html);
							m1.setText("၂");
							m2.setText("၆");
							m3.setText("၃");
							m4.setText("၅");
							m5.setText("၁");
							m6.setText("၄");
							m7.setText("၀");
							mm1.setText("၂");
							mm2.setText("၆");
							mm3.setText("၃");
							mm4.setText("၅");
							mm5.setText("၁");
							mm6.setText("၄");
							mm7.setText("၀");
						}
						else {
							if (mmm.getText().toString().equals("သောကြာ")) {
								html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br>သာမိ<br>အာယု<br>တြိရန်း<br>အတွင်းမိတ်</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>သမ္ပဒါန<br>နာဂရ<br>စတုရန်း<br>အတွင်းရန်</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>ကမ္မ<br>ဘုမ္မိ<br>ပဉ္စပွတ်<br>အပြင်မိတ်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>ကတ္တု<br>ပရိဝါရ<br>မွေးနံ<br>ဥဒါသိန်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>ကရဏ<br>ဂဟပတိ<br>ဆပွတ်<br>ဓာတ်မိတ်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br>အလမ္ပန<br>သီရိ<br>ဆပွတ်<br>ဓာတ်မိတ်</th>\n                <th><font color=\"red\">၅ တေး</font><br>&nbsp;ဩကာသ&nbsp;<br>ဌာန<br>အမြစ်<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">စနေ</font><br>အပါဒါန<br>တေဇ<br>အညွန့်<br>ဓာတ်ရန်<br>အပြင်ရန်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">​သော​ကြာသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
								
								captureAhta(html);
								m1.setText("၃");
								m2.setText("၀");
								m3.setText("၄");
								m4.setText("၆");
								m5.setText("၂");
								m6.setText("၅");
								m7.setText("၁");
								mm1.setText("၃");
								mm2.setText("၀");
								mm3.setText("၄");
								mm4.setText("၆");
								mm5.setText("၂");
								mm6.setText("၅");
								mm7.setText("၁");
							}
							else {
								if (mmm.getText().toString().equals("စနေ")) {
									html = "\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%\">\n            <tr>\n                <th><font color=\"red\">၁ နွေ</font><br> ဂဟပတိ<br>ကရဏ<br>အညွန့်<br>ဓာတ်မိတ်</th>\n                <th><font color=\"red\">၂ င်္လာ</font><br>တေဇ<br>အပါဒါန<br>တြိရန်း<br>ဥဒါသိန်</th>\n                <th><font color=\"red\">၃ င်္ဂါ</font><br>ဌာန<br>ဩကာသ<br>စတုရန်း<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">၆ ကြာ</font><br>ဘုမ္မိ<br>ကမ္မ<br>အမြစ်<br>အပြင်ရန်<br>ဓာတ်ရန်</th>\n                <th></th>\n                <th><font color=\"red\">၄ ဟူး</font><br>သီရိ<br>အလမ္ပန<br>ပဉ္စပွတ်<br>အတွင်းမိတ်</th>\n                </tr>\n                <tr>\n                <th><font color=\"red\">ရာဟု</font><br> နာဂရ<br>သမ္ပဒါန<br>ပဉ္စပွတ်<br>&nbsp;&nbsp;အပြင်မိတ်&nbsp;&nbsp;</th>\n                <th><font color=\"red\">၅ တေး</font><br>အာယု<br>သာမိ<br>ဆပွတ်<br>&nbsp;&nbsp;အတွင်းရန်&nbsp;&nbsp;</th>\n                <th><font color=\"red\">စနေ</font><br>ပရိဝါရ<br>ကတ္တု<br>မွေးနံ<br>ဥဒါသိန်</th>\n                </tr>\n                <tr>\n                    <th colspan=\"3\">စနေသားသမီးများ၏အဋ္ဌလဂ်ခွင်</th>\n                </tr>\n</table>";
									
									captureAhta(html);
									m1.setText("၄");
									m2.setText("၁");
									m3.setText("၅");
									m4.setText("၀");
									m5.setText("၃");
									m6.setText("၆");
									m7.setText("၂");
									mm1.setText("၄");
									mm2.setText("၁");
									mm3.setText("၅");
									mm4.setText("၀");
									mm5.setText("၃");
									mm6.setText("၆");
									mm7.setText("၂");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_thet();
		}
        function _sannkyin() {
		if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၄")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၃")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၂")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၁")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၀")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၆")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၅")))))))) {
			textview95.setText("၁ နွေ");
		}
		else {
			if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၆")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၅")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၄")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၃")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၂")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၁")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၀")))))))) {
				textview95.setText("၂ င်္လာ");
			}
			else {
				if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၁")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၀")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၆")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၅")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၄")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၃")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၂")))))))) {
					textview95.setText("၃ င်္ဂါ");
				}
				else {
					if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၃")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၂")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၁")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၀")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၆")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၅")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၄")))))))) {
						textview95.setText("၄ ဟူး");
					}
					else {
						if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၅")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၄")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၃")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၂")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၁")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၀")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၆")))))))) {
							textview95.setText("၅ တေး");
						}
						else {
							if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၀")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၆")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၅")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၄")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၃")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၂")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၁")))))))) {
								textview95.setText("၆ ကြာ");
							}
							else {
								if ((a.getText().toString().equals("၁") && s1.getText().toString().equals("၂")) || ((a.getText().toString().equals("၂") && s1.getText().toString().equals("၁")) || ((a.getText().toString().equals("၃") && s1.getText().toString().equals("၀")) || ((a.getText().toString().equals("၄") && s1.getText().toString().equals("၆")) || ((a.getText().toString().equals("၅") && s1.getText().toString().equals("၅")) || ((a.getText().toString().equals("၆") && s1.getText().toString().equals("၄")) || (a.getText().toString().equals("၀") && s1.getText().toString().equals("၃")))))))) {
									textview95.setText("စနေ");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _ai() {
		if ((Number(textview193.getText().toString()) % 7) == 1) {
			ai1.setText("၁");
			ai2.setText("၄");
			ai3.setText("၀");
			ai4.setText("၃");
			ai5.setText("၆");
			ai6.setText("၂");
			ai7.setText("၅");
		}
		else {
			if ((Number(textview193.getText().toString()) % 7) == 2) {
				ai1.setText("၂");
				ai2.setText("၅");
				ai3.setText("၁");
				ai4.setText("၄");
				ai5.setText("၀");
				ai6.setText("၃");
				ai7.setText("၆");
			}
			else {
				if ((Number(textview193.getText().toString()) % 7) == 3) {
					ai1.setText("၃");
					ai2.setText("၆");
					ai3.setText("၂");
					ai4.setText("၅");
					ai5.setText("၁");
					ai6.setText("၄");
					ai7.setText("၀");
				}
				else {
					if ((Number(textview193.getText().toString()) % 7) == 4) {
						ai1.setText("၄");
						ai2.setText("၀");
						ai3.setText("၃");
						ai4.setText("၆");
						ai5.setText("၂");
						ai6.setText("၅");
						ai7.setText("၁");
					}
					else {
						if ((Number(textview193.getText().toString()) % 7) == 5) {
							ai1.setText("၅");
							ai2.setText("၁");
							ai3.setText("၄");
							ai4.setText("၀");
							ai5.setText("၃");
							ai6.setText("၆");
							ai7.setText("၂");
						}
						else {
							if ((Number(textview193.getText().toString()) % 7) == 6) {
								ai1.setText("၆");
								ai2.setText("၂");
								ai3.setText("၅");
								ai4.setText("၁");
								ai5.setText("၄");
								ai6.setText("၀");
								ai7.setText("၃");
							}
							else {
								if ((Number(textview193.getText().toString()) % 7) == 0) {
									ai1.setText("၀");
									ai2.setText("၃");
									ai3.setText("၆");
									ai4.setText("၂");
									ai5.setText("၅");
									ai6.setText("၁");
									ai7.setText("၄");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_an();
	}
        function _an() {
		if (cc.getText().toString().equals("၁")) {
			an1.setText("၁");
			an2.setText("၀");
			an3.setText("၆");
			an4.setText("၅");
			an5.setText("၄");
			an6.setText("၃");
			an7.setText("၂");
		}
		else {
			if (cc.getText().toString().equals("၂")) {
				an1.setText("၂");
				an2.setText("၁");
				an3.setText("၀");
				an4.setText("၆");
				an5.setText("၅");
				an6.setText("၄");
				an7.setText("၃");
			}
			else {
				if (cc.getText().toString().equals("၃")) {
					an1.setText("၃");
					an2.setText("၂");
					an3.setText("၁");
					an4.setText("၀");
					an5.setText("၆");
					an6.setText("၅");
					an7.setText("၄");
				}
				else {
					if (cc.getText().toString().equals("၄")) {
						an1.setText("၄");
						an2.setText("၃");
						an3.setText("၂");
						an4.setText("၁");
						an5.setText("၀");
						an6.setText("၆");
						an7.setText("၅");
					}
					else {
						if (cc.getText().toString().equals("၅")) {
							an1.setText("၅");
							an2.setText("၄");
							an3.setText("၃");
							an4.setText("၂");
							an5.setText("၁");
							an6.setText("၀");
							an7.setText("၆");
						}
						else {
							if (cc.getText().toString().equals("၆")) {
								an1.setText("၆");
								an2.setText("၅");
								an3.setText("၄");
								an4.setText("၃");
								an5.setText("၂");
								an6.setText("၁");
								an7.setText("၀");
							}
							else {
								if (cc.getText().toString().equals("၀")) {
									an1.setText("၀");
									an2.setText("၆");
									an3.setText("၅");
									an4.setText("၄");
									an5.setText("၃");
									an6.setText("၂");
									an7.setText("၁");
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_shi();
	}
        function _azitta() {
		age = Number(textview193.getText().toString());
		if (mmm.getText().toString().equals("တနင်္ဂနွေ")) {
			if (((age == 0) || (0 < age)) && ((age == 6) || (age < 6))) {
				ab1.setText("၆");
				ab2.setText("၅");
				ab3.setText("၄");
				ab4.setText("၃");
				ab5.setText("၂");
				ab6.setText("၁");
				ab7.setText("၀");
				ac1.setText("၅");
				ac2.setText("၄");
				ac3.setText("၃");
				ac4.setText("၂");
				ac5.setText("၁");
				ac6.setText("၀");
				ac7.setText("၆");
			}
			else {
				if (((age == 7) || (7 < age)) && ((age == 21) || (age < 21))) {
					ab1.setText("၂");
					ab2.setText("၁");
					ab3.setText("၀");
					ab4.setText("၆");
					ab5.setText("၅");
					ab6.setText("၄");
					ab7.setText("၃");
					ac1.setText("၂");
					ac2.setText("၁");
					ac3.setText("၀");
					ac4.setText("၆");
					ac5.setText("၅");
					ac6.setText("၄");
					ac7.setText("၃");
				}
				else {
					if (((age == 22) || (22 < age)) && ((age == 29) || (age < 29))) {
						ab1.setText("၀");
						ab2.setText("၆");
						ab3.setText("၅");
						ab4.setText("၄");
						ab5.setText("၃");
						ab6.setText("၂");
						ab7.setText("၁");
						ac1.setText("၄");
						ac2.setText("၃");
						ac3.setText("၂");
						ac4.setText("၁");
						ac5.setText("၀");
						ac6.setText("၆");
						ac7.setText("၅");
					}
					else {
						if (((age == 30) || (30 < age)) && ((age == 46) || (age < 46))) {
							ab1.setText("၀");
							ab2.setText("၆");
							ab3.setText("၅");
							ab4.setText("၄");
							ab5.setText("၃");
							ab6.setText("၂");
							ab7.setText("၁");
							ac1.setText("၄");
							ac2.setText("၃");
							ac3.setText("၂");
							ac4.setText("၁");
							ac5.setText("၀");
							ac6.setText("၆");
							ac7.setText("၅");
						}
						else {
							if (((age == 47) || (47 < age)) && ((age == 56) || (age < 56))) {
								ab1.setText("၁");
								ab2.setText("၀");
								ab3.setText("၆");
								ab4.setText("၅");
								ab5.setText("၄");
								ab6.setText("၃");
								ab7.setText("၂");
								ac1.setText("၃");
								ac2.setText("၂");
								ac3.setText("၁");
								ac4.setText("၀");
								ac5.setText("၆");
								ac6.setText("၅");
								ac7.setText("၄");
							}
							else {
								if (((age == 57) || (57 < age)) && ((age == 75) || (age < 75))) {
									ab1.setText("၃");
									ab2.setText("၂");
									ab3.setText("၁");
									ab4.setText("၀");
									ab5.setText("၆");
									ab6.setText("၅");
									ab7.setText("၄");
									ac1.setText("၁");
									ac2.setText("၀");
									ac3.setText("၆");
									ac4.setText("၅");
									ac5.setText("၄");
									ac6.setText("၃");
									ac7.setText("၂");
								}
								else {
									if (((age == 76) || (76 < age)) && ((age == 87) || (age < 87))) {
										ab1.setText("၄");
										ab2.setText("၃");
										ab3.setText("၂");
										ab4.setText("၁");
										ab5.setText("၀");
										ab6.setText("၆");
										ab7.setText("၅");
										ac1.setText("၀");
										ac2.setText("၆");
										ac3.setText("၅");
										ac4.setText("၄");
										ac5.setText("၃");
										ac6.setText("၂");
										ac7.setText("၁");
									}
									else {
										if (((age == 88) || (88 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၅");
											ab2.setText("၄");
											ab3.setText("၃");
											ab4.setText("၂");
											ab5.setText("၁");
											ab6.setText("၀");
											ab7.setText("၆");
											ac1.setText("၆");
											ac2.setText("၅");
											ac3.setText("၄");
											ac4.setText("၃");
											ac5.setText("၂");
											ac6.setText("၁");
											ac7.setText("၀");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a11();
		}
	}
        function _a11() {
		if (mmm.getText().toString().equals("တနင်္လာ")) {
			if (((age == 0) || (0 < age)) && ((age == 15) || (age < 15))) {
				ab1.setText("၂");
				ab2.setText("၁");
				ab3.setText("၀");
				ab4.setText("၆");
				ab5.setText("၅");
				ab6.setText("၄");
				ab7.setText("၃");
				ac1.setText("၄");
				ac2.setText("၃");
				ac3.setText("၂");
				ac4.setText("၁");
				ac5.setText("၀");
				ac6.setText("၆");
				ac7.setText("၅");
			}
			else {
				if (((age == 16) || (16 < age)) && ((age == 23) || (age < 23))) {
					ab1.setText("၀");
					ab2.setText("၆");
					ab3.setText("၅");
					ab4.setText("၄");
					ab5.setText("၃");
					ab6.setText("၂");
					ab7.setText("၁");
					ac1.setText("၆");
					ac2.setText("၅");
					ac3.setText("၄");
					ac4.setText("၃");
					ac5.setText("၂");
					ac6.setText("၁");
					ac7.setText("၀");
				}
				else {
					if (((age == 24) || (24 < age)) && ((age == 40) || (age < 40))) {
						ab1.setText("၀");
						ab2.setText("၆");
						ab3.setText("၅");
						ab4.setText("၄");
						ab5.setText("၃");
						ab6.setText("၂");
						ab7.setText("၁");
						ac1.setText("၆");
						ac2.setText("၅");
						ac3.setText("၄");
						ac4.setText("၃");
						ac5.setText("၂");
						ac6.setText("၁");
						ac7.setText("၀");
					}
					else {
						if (((age == 41) || (41 < age)) && ((age == 50) || (age < 50))) {
							ab1.setText("၁");
							ab2.setText("၀");
							ab3.setText("၆");
							ab4.setText("၅");
							ab5.setText("၄");
							ab6.setText("၃");
							ab7.setText("၂");
							ac1.setText("၅");
							ac2.setText("၄");
							ac3.setText("၃");
							ac4.setText("၂");
							ac5.setText("၁");
							ac6.setText("၀");
							ac7.setText("၆");
						}
						else {
							if (((age == 51) || (51 < age)) && ((age == 69) || (age < 69))) {
								ab1.setText("၃");
								ab2.setText("၂");
								ab3.setText("၁");
								ab4.setText("၀");
								ab5.setText("၆");
								ab6.setText("၅");
								ab7.setText("၄");
								ac1.setText("၃");
								ac2.setText("၂");
								ac3.setText("၁");
								ac4.setText("၀");
								ac5.setText("၆");
								ac6.setText("၅");
								ac7.setText("၄");
							}
							else {
								if (((age == 70) || (70 < age)) && ((age == 81) || (age < 81))) {
									ab1.setText("၄");
									ab2.setText("၃");
									ab3.setText("၂");
									ab4.setText("၁");
									ab5.setText("၀");
									ab6.setText("၆");
									ab7.setText("၅");
									ac1.setText("၂");
									ac2.setText("၁");
									ac3.setText("၀");
									ac4.setText("၆");
									ac5.setText("၅");
									ac6.setText("၄");
									ac7.setText("၃");
								}
								else {
									if (((age == 82) || (82 < age)) && ((age == 102) || (age < 102))) {
										ab1.setText("၅");
										ab2.setText("၄");
										ab3.setText("၃");
										ab4.setText("၂");
										ab5.setText("၁");
										ab6.setText("၀");
										ab7.setText("၆");
										ac1.setText("၁");
										ac2.setText("၀");
										ac3.setText("၆");
										ac4.setText("၅");
										ac5.setText("၄");
										ac6.setText("၃");
										ac7.setText("၂");
									}
									else {
										if (((age == 103) || (103 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၆");
											ab2.setText("၅");
											ab3.setText("၄");
											ab4.setText("၃");
											ab5.setText("၂");
											ab6.setText("၁");
											ab7.setText("၀");
											ac1.setText("၀");
											ac2.setText("၆");
											ac3.setText("၅");
											ac4.setText("၄");
											ac5.setText("၃");
											ac6.setText("၂");
											ac7.setText("၁");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a22();
		}
	}
        function _a22() {
		if (mmm.getText().toString().equals("အင်္ဂါ")) {
			if (((age == 0) || (0 < age)) && ((age == 8) || (age < 8))) {
				ab1.setText("၀");
				ab2.setText("၆");
				ab3.setText("၅");
				ab4.setText("၄");
				ab5.setText("၃");
				ab6.setText("၂");
				ab7.setText("၁");
				ac1.setText("၁");
				ac2.setText("၀");
				ac3.setText("၆");
				ac4.setText("၅");
				ac5.setText("၄");
				ac6.setText("၃");
				ac7.setText("၂");
			}
			else {
				if (((age == 9) || (9 < age)) && ((age == 25) || (age < 25))) {
					ab1.setText("၀");
					ab2.setText("၆");
					ab3.setText("၅");
					ab4.setText("၄");
					ab5.setText("၃");
					ab6.setText("၂");
					ab7.setText("၁");
					ac1.setText("၁");
					ac2.setText("၀");
					ac3.setText("၆");
					ac4.setText("၅");
					ac5.setText("၄");
					ac6.setText("၃");
					ac7.setText("၂");
				}
				else {
					if (((age == 26) || (26 < age)) && ((age == 35) || (age < 35))) {
						ab1.setText("၁");
						ab2.setText("၀");
						ab3.setText("၆");
						ab4.setText("၅");
						ab5.setText("၄");
						ab6.setText("၃");
						ab7.setText("၂");
						ac1.setText("၀");
						ac2.setText("၆");
						ac3.setText("၅");
						ac4.setText("၄");
						ac5.setText("၃");
						ac6.setText("၂");
						ac7.setText("၁");
					}
					else {
						if (((age == 36) || (36 < age)) && ((age == 54) || (age < 54))) {
							ab1.setText("၃");
							ab2.setText("၂");
							ab3.setText("၁");
							ab4.setText("၀");
							ab5.setText("၆");
							ab6.setText("၅");
							ab7.setText("၄");
							ac1.setText("၅");
							ac2.setText("၄");
							ac3.setText("၃");
							ac4.setText("၂");
							ac5.setText("၁");
							ac6.setText("၀");
							ac7.setText("၆");
						}
						else {
							if (((age == 55) || (55 < age)) && ((age == 66) || (age < 66))) {
								ab1.setText("၄");
								ab2.setText("၃");
								ab3.setText("၂");
								ab4.setText("၁");
								ab5.setText("၀");
								ab6.setText("၆");
								ab7.setText("၅");
								ac1.setText("၄");
								ac2.setText("၃");
								ac3.setText("၂");
								ac4.setText("၁");
								ac5.setText("၀");
								ac6.setText("၆");
								ac7.setText("၅");
							}
							else {
								if (((age == 67) || (67 < age)) && ((age == 87) || (age < 87))) {
									ab1.setText("၅");
									ab2.setText("၄");
									ab3.setText("၃");
									ab4.setText("၂");
									ab5.setText("၁");
									ab6.setText("၀");
									ab7.setText("၆");
									ac1.setText("၃");
									ac2.setText("၂");
									ac3.setText("၁");
									ac4.setText("၀");
									ac5.setText("၆");
									ac6.setText("၅");
									ac7.setText("၄");
								}
								else {
									if (((age == 88) || (88 < age)) && ((age == 93) || (age < 93))) {
										ab1.setText("၆");
										ab2.setText("၅");
										ab3.setText("၄");
										ab4.setText("၃");
										ab5.setText("၂");
										ab6.setText("၁");
										ab7.setText("၀");
										ac1.setText("၂");
										ac2.setText("၁");
										ac3.setText("၀");
										ac4.setText("၆");
										ac5.setText("၅");
										ac6.setText("၄");
										ac7.setText("၃");
									}
									else {
										if (((age == 94) || (94 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၂");
											ab2.setText("၁");
											ab3.setText("၀");
											ab4.setText("၆");
											ab5.setText("၅");
											ab6.setText("၄");
											ab7.setText("၃");
											ac1.setText("၆");
											ac2.setText("၅");
											ac3.setText("၄");
											ac4.setText("၃");
											ac5.setText("၂");
											ac6.setText("၁");
											ac7.setText("၀");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a33();
		}
	}
        function _a33() {
		if (mmm.getText().toString().equals("ဗုဒ္ဓဟူး")) {
			if (((age == 0) || (0 < age)) && ((age == 17) || (age < 17))) {
				ab1.setText("၀");
				ab2.setText("၆");
				ab3.setText("၅");
				ab4.setText("၄");
				ab5.setText("၃");
				ab6.setText("၂");
				ab7.setText("၁");
				ac1.setText("၃");
				ac2.setText("၂");
				ac3.setText("၁");
				ac4.setText("၀");
				ac5.setText("၆");
				ac6.setText("၅");
				ac7.setText("၄");
			}
			else {
				if (((age == 18) || (18 < age)) && ((age == 27) || (age < 27))) {
					ab1.setText("၁");
					ab2.setText("၀");
					ab3.setText("၆");
					ab4.setText("၅");
					ab5.setText("၄");
					ab6.setText("၃");
					ab7.setText("၂");
					ac1.setText("၂");
					ac2.setText("၁");
					ac3.setText("၀");
					ac4.setText("၆");
					ac5.setText("၅");
					ac6.setText("၄");
					ac7.setText("၃");
				}
				else {
					if (((age == 28) || (28 < age)) && ((age == 46) || (age < 46))) {
						ab1.setText("၃");
						ab2.setText("၂");
						ab3.setText("၁");
						ab4.setText("၀");
						ab5.setText("၆");
						ab6.setText("၅");
						ab7.setText("၄");
						ac1.setText("၀");
						ac2.setText("၆");
						ac3.setText("၅");
						ac4.setText("၄");
						ac5.setText("၃");
						ac6.setText("၂");
						ac7.setText("၁");
					}
					else {
						if (((age == 47) || (47 < age)) && ((age == 58) || (age < 58))) {
							ab1.setText("၄");
							ab2.setText("၃");
							ab3.setText("၂");
							ab4.setText("၁");
							ab5.setText("၀");
							ab6.setText("၆");
							ab7.setText("၅");
							ac1.setText("၆");
							ac2.setText("၅");
							ac3.setText("၄");
							ac4.setText("၃");
							ac5.setText("၂");
							ac6.setText("၁");
							ac7.setText("၀");
						}
						else {
							if (((age == 59) || (59 < age)) && ((age == 79) || (age < 79))) {
								ab1.setText("၅");
								ab2.setText("၄");
								ab3.setText("၃");
								ab4.setText("၂");
								ab5.setText("၁");
								ab6.setText("၀");
								ab7.setText("၆");
								ac1.setText("၅");
								ac2.setText("၄");
								ac3.setText("၃");
								ac4.setText("၂");
								ac5.setText("၁");
								ac6.setText("၀");
								ac7.setText("၆");
							}
							else {
								if (((age == 80) || (80 < age)) && ((age == 85) || (age < 85))) {
									ab1.setText("၆");
									ab2.setText("၅");
									ab3.setText("၄");
									ab4.setText("၃");
									ab5.setText("၂");
									ab6.setText("၁");
									ab7.setText("၀");
									ac1.setText("၄");
									ac2.setText("၃");
									ac3.setText("၂");
									ac4.setText("၁");
									ac5.setText("၀");
									ac6.setText("၆");
									ac7.setText("၅");
								}
								else {
									if (((age == 86) || (86 < age)) && ((age == 100) || (age < 100))) {
										ab1.setText("၂");
										ab2.setText("၁");
										ab3.setText("၀");
										ab4.setText("၆");
										ab5.setText("၅");
										ab6.setText("၄");
										ab7.setText("၃");
										ac1.setText("၁");
										ac2.setText("၀");
										ac3.setText("၆");
										ac4.setText("၅");
										ac5.setText("၄");
										ac6.setText("၃");
										ac7.setText("၂");
									}
									else {
										if (((age == 101) || (101 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၀");
											ab2.setText("၆");
											ab3.setText("၅");
											ab4.setText("၄");
											ab5.setText("၃");
											ab6.setText("၂");
											ab7.setText("၁");
											ac1.setText("၃");
											ac2.setText("၂");
											ac3.setText("၁");
											ac4.setText("၀");
											ac5.setText("၆");
											ac6.setText("၅");
											ac7.setText("၄");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a44();
		}
	}
        function _a44() {
		if (mmm.getText().toString().equals("စနေ")) {
			if (((age == 0) || (0 < age)) && ((age == 10) || (age < 10))) {
				ab1.setText("၁");
				ab2.setText("၀");
				ab3.setText("၆");
				ab4.setText("၅");
				ab5.setText("၄");
				ab6.setText("၃");
				ab7.setText("၂");
				ac1.setText("၁");
				ac2.setText("၀");
				ac3.setText("၆");
				ac4.setText("၅");
				ac5.setText("၄");
				ac6.setText("၃");
				ac7.setText("၂");
			}
			else {
				if (((age == 11) || (11 < age)) && ((age == 29) || (age < 29))) {
					ab1.setText("၃");
					ab2.setText("၂");
					ab3.setText("၁");
					ab4.setText("၀");
					ab5.setText("၆");
					ab6.setText("၅");
					ab7.setText("၄");
					ac1.setText("၆");
					ac2.setText("၅");
					ac3.setText("၄");
					ac4.setText("၃");
					ac5.setText("၂");
					ac6.setText("၁");
					ac7.setText("၀");
				}
				else {
					if (((age == 30) || (30 < age)) && ((age == 41) || (age < 41))) {
						ab1.setText("၄");
						ab2.setText("၃");
						ab3.setText("၂");
						ab4.setText("၁");
						ab5.setText("၀");
						ab6.setText("၆");
						ab7.setText("၅");
						ac1.setText("၅");
						ac2.setText("၄");
						ac3.setText("၃");
						ac4.setText("၂");
						ac5.setText("၁");
						ac6.setText("၀");
						ac7.setText("၆");
					}
					else {
						if (((age == 42) || (42 < age)) && ((age == 62) || (age < 62))) {
							ab1.setText("၅");
							ab2.setText("၄");
							ab3.setText("၃");
							ab4.setText("၂");
							ab5.setText("၁");
							ab6.setText("၀");
							ab7.setText("၆");
							ac1.setText("၄");
							ac2.setText("၃");
							ac3.setText("၂");
							ac4.setText("၁");
							ac5.setText("၀");
							ac6.setText("၆");
							ac7.setText("၅");
						}
						else {
							if (((age == 63) || (63 < age)) && ((age == 68) || (age < 68))) {
								ab1.setText("၆");
								ab2.setText("၅");
								ab3.setText("၄");
								ab4.setText("၃");
								ab5.setText("၂");
								ab6.setText("၁");
								ab7.setText("၀");
								ac1.setText("၃");
								ac2.setText("၂");
								ac3.setText("၁");
								ac4.setText("၀");
								ac5.setText("၆");
								ac6.setText("၅");
								ac7.setText("၄");
							}
							else {
								if (((age == 69) || (69 < age)) && ((age == 83) || (age < 83))) {
									ab1.setText("၂");
									ab2.setText("၁");
									ab3.setText("၀");
									ab4.setText("၆");
									ab5.setText("၅");
									ab6.setText("၄");
									ab7.setText("၃");
									ac1.setText("၀");
									ac2.setText("၆");
									ac3.setText("၅");
									ac4.setText("၄");
									ac5.setText("၃");
									ac6.setText("၂");
									ac7.setText("၁");
								}
								else {
									if (((age == 84) || (84 < age)) && ((age == 101) || (age < 101))) {
										ab1.setText("၀");
										ab2.setText("၆");
										ab3.setText("၅");
										ab4.setText("၄");
										ab5.setText("၃");
										ab6.setText("၂");
										ab7.setText("၁");
										ac1.setText("၂");
										ac2.setText("၁");
										ac3.setText("၀");
										ac4.setText("၆");
										ac5.setText("၅");
										ac6.setText("၄");
										ac7.setText("၃");
									}
									else {
										if (((age == 102) || (102 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၀");
											ab2.setText("၆");
											ab3.setText("၅");
											ab4.setText("၄");
											ab5.setText("၃");
											ab6.setText("၂");
											ab7.setText("၁");
											ac1.setText("၂");
											ac2.setText("၁");
											ac3.setText("၀");
											ac4.setText("၆");
											ac5.setText("၅");
											ac6.setText("၄");
											ac7.setText("၃");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a55();
		}
	}
        function _a55() {
		if (mmm.getText().toString().equals("ကြာသပတေး")) {
			if (((age == 0) || (0 < age)) && ((age == 19) || (age < 19))) {
				ab1.setText("၃");
				ab2.setText("၂");
				ab3.setText("၁");
				ab4.setText("၀");
				ab5.setText("၆");
				ab6.setText("၅");
				ab7.setText("၄");
				ac1.setText("၂");
				ac2.setText("၁");
				ac3.setText("၀");
				ac4.setText("၆");
				ac5.setText("၅");
				ac6.setText("၄");
				ac7.setText("၃");
			}
			else {
				if (((age == 20) || (20 < age)) && ((age == 31) || (age < 31))) {
					ab1.setText("၄");
					ab2.setText("၃");
					ab3.setText("၂");
					ab4.setText("၁");
					ab5.setText("၀");
					ab6.setText("၆");
					ab7.setText("၅");
					ac1.setText("၁");
					ac2.setText("၀");
					ac3.setText("၆");
					ac4.setText("၅");
					ac5.setText("၄");
					ac6.setText("၃");
					ac7.setText("၂");
				}
				else {
					if (((age == 32) || (32 < age)) && ((age == 52) || (age < 52))) {
						ab1.setText("၅");
						ab2.setText("၄");
						ab3.setText("၃");
						ab4.setText("၂");
						ab5.setText("၁");
						ab6.setText("၀");
						ab7.setText("၆");
						ac1.setText("၀");
						ac2.setText("၆");
						ac3.setText("၅");
						ac4.setText("၄");
						ac5.setText("၃");
						ac6.setText("၂");
						ac7.setText("၁");
					}
					else {
						if (((age == 53) || (53 < age)) && ((age == 58) || (age < 58))) {
							ab1.setText("၆");
							ab2.setText("၅");
							ab3.setText("၄");
							ab4.setText("၃");
							ab5.setText("၂");
							ab6.setText("၁");
							ab7.setText("၀");
							ac1.setText("၆");
							ac2.setText("၅");
							ac3.setText("၄");
							ac4.setText("၃");
							ac5.setText("၂");
							ac6.setText("၁");
							ac7.setText("၀");
						}
						else {
							if (((age == 59) || (59 < age)) && ((age == 73) || (age < 73))) {
								ab1.setText("၂");
								ab2.setText("၁");
								ab3.setText("၀");
								ab4.setText("၆");
								ab5.setText("၅");
								ab6.setText("၄");
								ab7.setText("၃");
								ac1.setText("၄");
								ac2.setText("၃");
								ac3.setText("၂");
								ac4.setText("၁");
								ac5.setText("၀");
								ac6.setText("၆");
								ac7.setText("၅");
							}
							else {
								if (((age == 74) || (74 < age)) && ((age == 81) || (age < 81))) {
									ab1.setText("၀");
									ab2.setText("၆");
									ab3.setText("၅");
									ab4.setText("၄");
									ab5.setText("၃");
									ab6.setText("၂");
									ab7.setText("၁");
									ac1.setText("၅");
									ac2.setText("၄");
									ac3.setText("၃");
									ac4.setText("၂");
									ac5.setText("၁");
									ac6.setText("၀");
									ac7.setText("၆");
								}
								else {
									if (((age == 82) || (82 < age)) && ((age == 98) || (age < 98))) {
										ab1.setText("၀");
										ab2.setText("၆");
										ab3.setText("၅");
										ab4.setText("၄");
										ab5.setText("၃");
										ab6.setText("၂");
										ab7.setText("၁");
										ac1.setText("၅");
										ac2.setText("၄");
										ac3.setText("၃");
										ac4.setText("၂");
										ac5.setText("၁");
										ac6.setText("၀");
										ac7.setText("၆");
									}
									else {
										if (((age == 99) || (99 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၁");
											ab2.setText("၀");
											ab3.setText("၆");
											ab4.setText("၅");
											ab5.setText("၄");
											ab6.setText("၃");
											ab7.setText("၂");
											ac1.setText("၄");
											ac2.setText("၃");
											ac3.setText("၂");
											ac4.setText("၁");
											ac5.setText("၀");
											ac6.setText("၆");
											ac7.setText("၅");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_a66();
		}
	}
        function _a66() {
		if (mmm.getText().toString().equals("သောကြာ")) {
			if (((age == 0) || (0 < age)) && ((age == 21) || (age < 21))) {
				ab1.setText("၅");
				ab2.setText("၄");
				ab3.setText("၃");
				ab4.setText("၂");
				ab5.setText("၁");
				ab6.setText("၀");
				ab7.setText("၆");
				ac1.setText("၂");
				ac2.setText("၁");
				ac3.setText("၀");
				ac4.setText("၆");
				ac5.setText("၅");
				ac6.setText("၄");
				ac7.setText("၃");
			}
			else {
				if (((age == 22) || (22 < age)) && ((age == 27) || (age < 27))) {
					ab1.setText("၆");
					ab2.setText("၅");
					ab3.setText("၄");
					ab4.setText("၃");
					ab5.setText("၂");
					ab6.setText("၁");
					ab7.setText("၀");
					ac1.setText("၁");
					ac2.setText("၀");
					ac3.setText("၆");
					ac4.setText("၅");
					ac5.setText("၄");
					ac6.setText("၃");
					ac7.setText("၂");
				}
				else {
					if (((age == 28) || (28 < age)) && ((age == 42) || (age < 42))) {
						ab1.setText("၂");
						ab2.setText("၁");
						ab3.setText("၀");
						ab4.setText("၆");
						ab5.setText("၅");
						ab6.setText("၄");
						ab7.setText("၃");
						ac1.setText("၅");
						ac2.setText("၄");
						ac3.setText("၃");
						ac4.setText("၂");
						ac5.setText("၁");
						ac6.setText("၀");
						ac7.setText("၆");
					}
					else {
						if (((age == 43) || (43 < age)) && ((age == 50) || (age < 50))) {
							ab1.setText("၀");
							ab2.setText("၆");
							ab3.setText("၅");
							ab4.setText("၄");
							ab5.setText("၃");
							ab6.setText("၂");
							ab7.setText("၁");
							ac1.setText("၀");
							ac2.setText("၆");
							ac3.setText("၅");
							ac4.setText("၄");
							ac5.setText("၃");
							ac6.setText("၂");
							ac7.setText("၁");
						}
						else {
							if (((age == 51) || (51 < age)) && ((age == 67) || (age < 67))) {
								ab1.setText("၀");
								ab2.setText("၆");
								ab3.setText("၅");
								ab4.setText("၄");
								ab5.setText("၃");
								ab6.setText("၂");
								ab7.setText("၁");
								ac1.setText("၀");
								ac2.setText("၆");
								ac3.setText("၅");
								ac4.setText("၄");
								ac5.setText("၃");
								ac6.setText("၂");
								ac7.setText("၁");
							}
							else {
								if (((age == 68) || (68 < age)) && ((age == 77) || (age < 77))) {
									ab1.setText("၁");
									ab2.setText("၀");
									ab3.setText("၆");
									ab4.setText("၅");
									ab5.setText("၄");
									ab6.setText("၃");
									ab7.setText("၂");
									ac1.setText("၆");
									ac2.setText("၅");
									ac3.setText("၄");
									ac4.setText("၃");
									ac5.setText("၂");
									ac6.setText("၁");
									ac7.setText("၀");
								}
								else {
									if (((age == 78) || (78 < age)) && ((age == 96) || (age < 96))) {
										ab1.setText("၃");
										ab2.setText("၂");
										ab3.setText("၁");
										ab4.setText("၀");
										ab5.setText("၆");
										ab6.setText("၅");
										ab7.setText("၄");
										ac1.setText("၄");
										ac2.setText("၃");
										ac3.setText("၂");
										ac4.setText("၁");
										ac5.setText("၀");
										ac6.setText("၆");
										ac7.setText("၅");
									}
									else {
										if (((age == 97) || (97 < age)) && ((age == 108) || (age < 108))) {
											ab1.setText("၄");
											ab2.setText("၃");
											ab3.setText("၂");
											ab4.setText("၁");
											ab5.setText("၀");
											ab6.setText("၆");
											ab7.setText("၅");
											ac1.setText("၃");
											ac2.setText("၂");
											ac3.setText("၁");
											ac4.setText("၀");
											ac5.setText("၆");
											ac6.setText("၅");
											ac7.setText("၄");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			
		}
	}
        function _sunaar() {
		if (at1.getText().toString().equals("၁")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၁၀၀% ကောင်းအားရှိတယ်။ ");
				pr2.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
				pr3.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
				pr4.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr5.setText("၂၅% ဆိုးအားရှိတယ်။");
				pr6.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr7.setText("၂၅% ကောင်းအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
					pr2.setText("၁၀၀% ဆိုးအားရှိတယ်။");
					pr3.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
					pr4.setText("အားကျေ။");
					pr5.setText("၇၅% ကောင်းအားရှိတယ်။");
					pr6.setText("အားကျေ။");
					pr7.setText("အားကျေ။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၇၅% ကောင်းအားရှိတယ်။ ");
						pr2.setText("အားကျေ။");
						pr3.setText("၇၅% ဆိုးအားရှိတယ်။");
						pr4.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr5.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
						pr6.setText("၁၂.၅% ဆိုးအားရှိတယ်။");
						pr7.setText("၂၅% ဆိုးအားရှိတယ်။ ");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၅၀% ကောင်းအားရှိတယ်။ ");
							pr2.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr3.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
							pr4.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr5.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr6.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
							pr7.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၂၅% ကောင်းအားရှိတယ်။ ");
								pr2.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr3.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
								pr4.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr5.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr6.setText("၇၅% ကောင်းအားရှိတယ်။");
								pr7.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("၁၂.၅% ကောင်းအားရှိတယ်။ ");
									pr2.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr3.setText("အားကျေ။");
									pr4.setText("၇၅% ဆိုးအားရှိတယ်။ ");
									pr5.setText("အားကျေ။");
									pr6.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
									pr7.setText("၅၀% ကောင်းအားရှိတယ်။ ");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("အားကျေ။");
										pr2.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr3.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr4.setText("၂၅% ကောင်းအားရှိတယ်။ ");
										pr5.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr6.setText("၃၇.၅% ကောင်းအားရှိတယ်။");
										pr7.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_monaar();
		}
	}
        function _monaar() {
		if (at1.getText().toString().equals("၂")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၂၅% ကောင်းအားရှိတယ်။ ");
				pr2.setText("၁၀၀% ကောင်းအားရှိတယ်။");
				pr3.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
				pr4.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
				pr5.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr6.setText("၂၅% ဆိုးအားရှိတယ်။");
				pr7.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("အားကျေ။");
					pr2.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
					pr3.setText("၁၀၀% ဆိုးအားရှိတယ်။");
					pr4.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
					pr5.setText("အားကျေ။");
					pr6.setText("၇၅% ကောင်းအားရှိတယ်။");
					pr7.setText("အားကျေ။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr2.setText("၇၅% ကောင်းအားရှိတယ်။");
						pr3.setText("အားကျေ။");
						pr4.setText("၇၅% ဆိုးအားရှိတယ်။");
						pr5.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr6.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
						pr7.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr2.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr3.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr4.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
							pr5.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr6.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr7.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr2.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr3.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr4.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
								pr5.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr6.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr7.setText("၇၅% ကောင်းအားရှိတယ်။ ");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("၅၀% ကောင်းအားရှိတယ်။ ");
									pr2.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr3.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr4.setText("အားကျေ။");
									pr5.setText("၇၅% ဆိုးအားရှိတယ်။ ");
									pr6.setText("အားကျေ။");
									pr7.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr2.setText("အားကျေ။");
										pr3.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr4.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr5.setText("၂၅% ကောင်းအားရှိတယ်။ ");
										pr6.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr7.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_tueaar();
		}
	}
        function _tueaar() {
		if (at1.getText().toString().equals("၃")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၁၂.၅% ကောင်းအားရှိတယ်။ ");
				pr2.setText("၂၅% ကောင်းအားရှိတယ်။");
				pr3.setText("၁၀၀% ကောင်းအားရှိတယ်။");
				pr4.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
				pr5.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
				pr6.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr7.setText("၂၅% ဆိုးအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("အားကျေ။");
					pr2.setText("အားကျေ။");
					pr3.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
					pr4.setText("၁၀၀% ဆိုးအားရှိတယ်။");
					pr5.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
					pr6.setText("အားကျေ။");
					pr7.setText("၇၅% ကောင်းအားရှိတယ်။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
						pr2.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr3.setText("၇၅% ကောင်းအားရှိတယ်။");
						pr4.setText("အားကျေ။");
						pr5.setText("၇၅% ဆိုးအားရှိတယ်။");
						pr6.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr7.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
							pr2.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr3.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr4.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr5.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
							pr6.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr7.setText("၅၀% ကောင်းအားရှိတယ်။");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၇၅% ကောင်းအားရှိတယ်။ ");
								pr2.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr3.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr4.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr5.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
								pr6.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr7.setText("၂၅% ကောင်းအားရှိတယ်။");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
									pr2.setText("၅၀% ကောင်းအားရှိတယ်။ ");
									pr3.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr4.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr5.setText("အားကျေ။");
									pr6.setText("၇၅% ဆိုးအားရှိတယ်။ ");
									pr7.setText("အားကျေ။");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr2.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr3.setText("အားကျေ။");
										pr4.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr5.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr6.setText("၂၅% ကောင်းအားရှိတယ်။ ");
										pr7.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_wedaar();
		}
	}
        function _wedaar() {
		if (at1.getText().toString().equals("၄")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၂၅% ဆိုးအားရှိတယ်။ ");
				pr2.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr3.setText("၂၅% ကောင်းအားရှိတယ်။");
				pr4.setText("၁၀၀% ကောင်းအားရှိတယ်။");
				pr5.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
				pr6.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
				pr7.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("၇၅% ကောင်းအားရှိတယ်။ ");
					pr2.setText("အားကျေ။");
					pr3.setText("အားကျေ။");
					pr4.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
					pr5.setText("၁၀၀% ဆိုးအားရှိတယ်။");
					pr6.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
					pr7.setText("အားကျေ။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
						pr2.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
						pr3.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr4.setText("၇၅% ကောင်းအားရှိတယ်။");
						pr5.setText("အားကျေ။");
						pr6.setText("၇၅% ဆိုးအားရှိတယ်။");
						pr7.setText("၂၅% ဆိုးအားရှိတယ်။ ");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၅၀% ကောင်းအားရှိတယ်။ ");
							pr2.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
							pr3.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr4.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr5.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr6.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
							pr7.setText("၅၀% ဆိုးအားရှိတယ်။ ");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၂၅% ကောင်းအားရှိတယ်။ ");
								pr2.setText("၇၅% ကောင်းအားရှိတယ်။ ");
								pr3.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr4.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr5.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr6.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
								pr7.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("အားကျေ။");
									pr2.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
									pr3.setText("၅၀% ကောင်းအားရှိတယ်။ ");
									pr4.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr5.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr6.setText("အားကျေ။");
									pr7.setText("၇၅% ဆိုးအားရှိတယ်။ ");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr2.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr3.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr4.setText("အားကျေ။");
										pr5.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr6.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr7.setText("၂၅% ကောင်းအားရှိတယ်။ ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_tursarr();
		}
	}
        function _tursarr() {
		if (at1.getText().toString().equals("၅")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၁၂.၅% ကောင်းအားရှိတယ်။ ");
				pr2.setText("၂၅% ဆိုးအားရှိတယ်။");
				pr3.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr4.setText("၂၅% ကောင်းအားရှိတယ်။");
				pr5.setText("၁၀၀% ကောင်းအားရှိတယ်။");
				pr6.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
				pr7.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("အားကျေ။");
					pr2.setText("၇၅% ကောင်းအားရှိတယ်။");
					pr3.setText("အားကျေ။");
					pr4.setText("အားကျေ။");
					pr5.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
					pr6.setText("၁၀၀% ဆိုးအားရှိတယ်။");
					pr7.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr2.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
						pr3.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
						pr4.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr5.setText("၇၅% ကောင်းအားရှိတယ်။");
						pr6.setText("အားကျေ။");
						pr7.setText("၇၅% ဆိုးအားရှိတယ်။");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr2.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr3.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
							pr4.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr5.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr6.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr7.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr2.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr3.setText("၇၅% ကောင်းအားရှိတယ်။ ");
								pr4.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr5.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr6.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr7.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("၇၅% ဆိုးအားရှိတယ်။ ");
									pr2.setText("အားကျေ။");
									pr3.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
									pr4.setText("၅၀% ကောင်းအားရှိတယ်။ ");
									pr5.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr6.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr7.setText("အားကျေ။");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("၂၅% ကောင်းအားရှိတယ်။ ");
										pr2.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr3.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr4.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr5.setText("အားကျေ။");
										pr6.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr7.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_friarr();
		}
	}
        function _friarr() {
		if (at1.getText().toString().equals("၆")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
				pr2.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr3.setText("၂၅% ဆိုးအားရှိတယ်။");
				pr4.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr5.setText("၂၅% ကောင်းအားရှိတယ်။");
				pr6.setText("၁၀၀% ကောင်းအားရှိတယ်။");
				pr7.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
					pr2.setText("အားကျေ။");
					pr3.setText("၇၅% ကောင်းအားရှိတယ်။");
					pr4.setText("အားကျေ။");
					pr5.setText("အားကျေ။");
					pr6.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
					pr7.setText("၁၀၀% ဆိုးအားရှိတယ်။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("၇၅% ဆိုးအားရှိတယ်။ ");
						pr2.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr3.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
						pr4.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
						pr5.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr6.setText("၇၅% ကောင်းအားရှိတယ်။");
						pr7.setText("အားကျေ။");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၈၇.၅% ဆိုးအားရှိတယ်။ ");
							pr2.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr3.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr4.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
							pr5.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr6.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr7.setText("၁၂.၅% ဆိုးအားရှိတယ်။");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၁၂.၅% ကောင်းအားရှိတယ်။ ");
								pr2.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr3.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr4.setText("၇၅% ကောင်းအားရှိတယ်။ ");
								pr5.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr6.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr7.setText("၂၅% ဆိုးအားရှိတယ်။");
							}
							else {
								if (py1.getText().toString().equals(s6.getText().toString())) {
									pr1.setText("အားကျေ။");
									pr2.setText("၇၅% ဆိုးအားရှိတယ်။ ");
									pr3.setText("အားကျေ။");
									pr4.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
									pr5.setText("၅၀% ကောင်းအားရှိတယ်။ ");
									pr6.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr7.setText("၅၀% ဆိုးအားရှိတယ်။");
								}
								else {
									if (py1.getText().toString().equals(s7.getText().toString())) {
										pr1.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr2.setText("၂၅% ကောင်းအားရှိတယ်။ ");
										pr3.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
										pr4.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr5.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
										pr6.setText("အားကျေ။");
										pr7.setText("၇၅% ဆိုးအားရှိတယ်။");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			_sataar();
		}
	}
        function _sataar() {
		if (at1.getText().toString().equals("၀")) {
			if (py1.getText().toString().equals(s1.getText().toString())) {
				pr1.setText("၈၇.၅% ဆိုးအားရှိတယ်။ ");
				pr2.setText("၃၇.၅% ဆိုးအားရှိတယ်။");
				pr3.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr4.setText("၂၅% ဆိုးအားရှိတယ်။");
				pr5.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
				pr6.setText("၂၅% ကောင်းအားရှိတယ်။");
				pr7.setText("၁၀၀% ကောင်းအားရှိတယ်။");
			}
			else {
				if (py1.getText().toString().equals(s2.getText().toString())) {
					pr1.setText("၁၀၀% ဆိုးအားရှိတယ်။ ");
					pr2.setText("၆၂.၅% ဆိုးအားရှိတယ်။");
					pr3.setText("အားကျေ။");
					pr4.setText("၇၅% ကောင်းအားရှိတယ်။");
					pr5.setText("အားကျေ။");
					pr6.setText("အားကျေ။");
					pr7.setText("၈၇.၅% ကောင်းအားရှိတယ်။");
				}
				else {
					if (py1.getText().toString().equals(s3.getText().toString())) {
						pr1.setText("အားကျေ။");
						pr2.setText("၇၅% ဆိုးအားရှိတယ်။");
						pr3.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr4.setText("၆၂.၅% ကောင်းအားရှိတယ်။");
						pr5.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
						pr6.setText("၂၅% ဆိုးအားရှိတယ်။ ");
						pr7.setText("၇၅% ကောင်းအားရှိတယ်။");
					}
					else {
						if (py1.getText().toString().equals(s4.getText().toString())) {
							pr1.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
							pr2.setText("၈၇.၅% ဆိုးအားရှိတယ်။");
							pr3.setText("၅၀% ဆိုးအားရှိတယ်။ ");
							pr4.setText("၅၀% ကောင်းအားရှိတယ်။");
							pr5.setText("၈၇.၅% ကောင်းအားရှိတယ်။ ");
							pr6.setText("၃၇.၅% ဆိုးအားရှိတယ်။ ");
							pr7.setText("၅၀% ကောင်းအားရှိတယ်။");
						}
						else {
							if (py1.getText().toString().equals(s5.getText().toString())) {
								pr1.setText("၂၅% ဆိုးအားရှိတယ်။ ");
								pr2.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
								pr3.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
								pr4.setText("၂၅% ကောင်းအားရှိတယ်။");
								pr5.setText("၇၅% ကောင်းအားရှိတယ်။ ");
								pr6.setText("၅၀% ဆိုးအားရှိတယ်။ ");
								pr7.setText("၂၅% ကောင်းအားရှိတယ်။");
							}
							else {
								if (py1.getText().toString().equals(s5.getText().toString())) {
									pr1.setText("၂၅% ဆိုးအားရှိတယ်။ ");
									pr2.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									pr3.setText("၆၂.၅% ဆိုးအားရှိတယ်။ ");
									pr4.setText("၂၅% ကောင်းအားရှိတယ်။");
									pr5.setText("၇၅% ကောင်းအားရှိတယ်။ ");
									pr6.setText("၅၀% ဆိုးအားရှိတယ်။ ");
									pr7.setText("၂၅% ကောင်းအားရှိတယ်။");
								}
								else {
									if (py1.getText().toString().equals(s6.getText().toString())) {
										pr1.setText("၅၀% ဆိုးအားရှိတယ်။ ");
										pr2.setText("အားကျေ။");
										pr3.setText("၇၅% ဆိုးအားရှိတယ်။ ");
										pr4.setText("အားကျေ။");
										pr5.setText("၆၂.၅% ကောင်းအားရှိတယ်။ ");
										pr6.setText("၅၀% ကောင်းအားရှိတယ်။ ");
										pr7.setText("၁၂.၅% ကောင်းအားရှိတယ်။");
									}
									else {
										if (py1.getText().toString().equals(s7.getText().toString())) {
											pr1.setText("၇၅% ဆိုးအားရှိတယ်။ ");
											pr2.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
											pr3.setText("၂၅% ကောင်းအားရှိတယ်။ ");
											pr4.setText("၁၂.၅% ဆိုးအားရှိတယ်။ ");
											pr5.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
											pr6.setText("၃၇.၅% ကောင်းအားရှိတယ်။ ");
											pr7.setText("အားကျေ။");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			
		}
	}
        function _shi() {
		if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ/မဲ့");
			sh2.setText("ရှိ/မဲ့");
			sh3.setText("မဲ့/ရှိ");
			sh4.setText("မဲ့/ရှိ");
			sh5.setText("မဲ့/ရှိ");
			sh6.setText("ရှိ/မဲ့");
			sh7.setText("မဲ့/ရှိ");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့/ရှိ");
				sh2.setText("ရှိ/မဲ့");
				sh3.setText("မဲ့+ရှိ");
				sh4.setText("ရှိ/မဲ့");
				sh5.setText("ရှိ/မဲ့");
				sh6.setText("မဲ့/ရှိ");
				sh7.setText("မဲ့");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၃")) {
					sh1.setText("မဲ့");
					sh2.setText("မဲ့/ရှိ");
					sh3.setText("ရှိ");
					sh4.setText("မဲ့");
					sh5.setText("ရှိ/မဲ့");
					sh6.setText("မဲ့");
					sh7.setText("ရှိ");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
					
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၄")) {
						sh1.setText("-");
						sh2.setText("မဲ့/ရှိ");
						sh3.setText("မဲ့");
						sh4.setText("ရှိ");
						sh5.setText("ရှိ");
						sh6.setText("မဲ့");
						sh7.setText("-");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၅")) {
							sh1.setText("မဲ့");
							sh2.setText("မဲ့");
							sh3.setText("ရှိ");
							sh4.setText("-");
							sh5.setText("မဲ့");
							sh6.setText("မဲ့");
							sh7.setText("ရှိ");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၆")) {
								sh1.setText("မဲ့");
								sh2.setText("ရှိ");
								sh3.setText("မဲ့/ရှိ");
								sh4.setText("ရှိ");
								sh5.setText("မဲ့");
								sh6.setText("ရှိ");
								sh7.setText("ရှိ/မဲ့");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၁") && py1.getText().toString().equals("၀")) {
									sh1.setText("ရှိ/မဲ့");
									sh2.setText("-");
									sh3.setText("မဲ့/ရှိ");
									sh4.setText("ရှိ");
									sh5.setText("မဲ့/ရှိ");
									sh6.setText("မဲ့");
									sh7.setText("ရှိ/မဲ့");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
									
									
									
									
									
									
									
									
								}
								else {
									_shi1();
								}
							}
						}
					}
				}
			}
		}
	}
        function _shi1() {
		if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ/မဲ့");
			sh2.setText("ရှိ/မဲ့");
			sh3.setText("-");
			sh4.setText("မဲ့/ရှိ");
			sh5.setText("မဲ့");
			sh6.setText("မဲ့/ရှိ");
			sh7.setText("မဲ့");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့/ရှိ");
				sh2.setText("ရှိ/မဲ့");
				sh3.setText("ရှိ/မဲ့");
				sh4.setText("မဲ့/ရှိ");
				sh5.setText("မဲ့/ရှိ");
				sh6.setText("မဲ့/ရှိ");
				sh7.setText("ရှိ/မဲ့");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၃")) {
					sh1.setText("မဲ့");
					sh2.setText("မဲ့/ရှိ");
					sh3.setText("ရှိ/မဲ့");
					sh4.setText("-");
					sh5.setText("ရှိ/မဲ့");
					sh6.setText("ရှိ/မဲ့");
					sh7.setText("မဲ့/ရှိ");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၄")) {
						sh1.setText("ရှိ");
						sh2.setText("မဲ့");
						sh3.setText("မဲ့/ရှိ");
						sh4.setText("ရှိ");
						sh5.setText("မဲ့");
						sh6.setText("ရှိ/မဲ့");
						sh7.setText("မဲ့");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
						
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၅")) {
							sh1.setText("-");
							sh2.setText("-");
							sh3.setText("မဲ့/ရှိ");
							sh4.setText("မဲ့");
							sh5.setText("ရှိ");
							sh6.setText("ရှိ");
							sh7.setText("မဲ့");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၆")) {
								sh1.setText("ရှိ");
								sh2.setText("မဲ့");
								sh3.setText("မဲ့");
								sh4.setText("ရှိ");
								sh5.setText("-");
								sh6.setText("မဲ့");
								sh7.setText("မဲ့/ရှိ");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၂") && py1.getText().toString().equals("၀")) {
									sh1.setText("ရှိ/မဲ့");
									sh2.setText("မဲ့");
									sh3.setText("ရှိ");
									sh4.setText("မဲ့/ရှိ");
									sh5.setText("ရှိ");
									sh6.setText("မဲ့");
									sh7.setText("ရှိ");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
									
									
									
									
									
									
									
									
								}
								else {
									_shi2();
								}
							}
						}
					}
				}
			}
		}
	}
        function _shi2() {
		if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ");
			sh2.setText("ရှိ/မဲ့");
			sh3.setText("မဲ့");
			sh4.setText("ရှိ");
			sh5.setText("မဲ့/ရှိ");
			sh6.setText("ရှိ");
			sh7.setText("မဲ့");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့");
				sh2.setText("ရှိ/မဲ့");
				sh3.setText("ရှိ/မဲ့");
				sh4.setText("-");
				sh5.setText("မဲ့/ရှိ");
				sh6.setText("မဲ့");
				sh7.setText("မဲ့/ရှိ");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၃")) {
					sh1.setText("ရှိ/မဲ့");
					sh2.setText("မဲ့/ရှိ");
					sh3.setText("ရှိ/မဲ့");
					sh4.setText("ရှိ/မဲ့");
					sh5.setText("မဲ့/ရှိ");
					sh6.setText("မဲ့/ရှိ");
					sh7.setText("မဲ့/ရှိ");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၄")) {
						sh1.setText("မဲ့/ရှိ");
						sh2.setText("မဲ့");
						sh3.setText("မဲ့/ရှိ");
						sh4.setText("ရှိ/မဲ့");
						sh5.setText("-");
						sh6.setText("ရှိ/မဲ့");
						sh7.setText("ရှိ/မဲ့");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၅")) {
							sh1.setText("မဲ့");
							sh2.setText("ရှိ");
							sh3.setText("မဲ့");
							sh4.setText("မဲ့/ရှိ");
							sh5.setText("ရှိ");
							sh6.setText("မဲ့");
							sh7.setText("ရှိ/မဲ့");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
							
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၆")) {
								sh1.setText("မဲ့");
								sh2.setText("-");
								sh3.setText("-");
								sh4.setText("မဲ့/ရှိ");
								sh5.setText("မဲ့");
								sh6.setText("ရှိ");
								sh7.setText("ရှိ");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၃") && py1.getText().toString().equals("၀")) {
									sh1.setText("မဲ့/ရှိ");
									sh2.setText("ရှိ");
									sh3.setText("မဲ့");
									sh4.setText("မဲ့");
									sh5.setText("ရှိ");
									sh6.setText("-");
									sh7.setText("မဲ့");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
									
									
									
									
									
									
									
									
								}
								else {
									_shi3();
								}
							}
						}
					}
				}
			}
		}
	}
        function _shi3() {
		if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၁")) {
			sh1.setText("မဲ့");
			sh2.setText("မဲ့/ရှိ");
			sh3.setText("ရှိ");
			sh4.setText("မဲ့");
			sh5.setText("မဲ့");
			sh6.setText("ရှိ");
			sh7.setText("-");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့");
				sh2.setText("ရှိ");
				sh3.setText("ရှိ/မဲ့");
				sh4.setText("မဲ့");
				sh5.setText("ရှိ");
				sh6.setText("မဲ့/ရှိ");
				sh7.setText("ရှိ");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၃")) {
					sh1.setText("မဲ့/ရှိ");
					sh2.setText("မဲ့");
					sh3.setText("ရှိ/မဲ့");
					sh4.setText("ရှိ/မဲ့");
					sh5.setText("-");
					sh6.setText("မဲ့/ရှိ");
					sh7.setText("မဲ့");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၄")) {
						sh1.setText("မဲ့/ရှိ");
						sh2.setText("ရှိ/မဲ့");
						sh3.setText("မဲ့/ရှိ");
						sh4.setText("ရှိ/မဲ့");
						sh5.setText("ရှိ/မဲ့");
						sh6.setText("မဲ့/ရှိ");
						sh7.setText("မဲ့/ရှိ");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၅")) {
							sh1.setText("ရှိ/မဲ့");
							sh2.setText("မဲ့/ရှိ");
							sh3.setText("မဲ့");
							sh4.setText("မဲ့/ရှိ");
							sh5.setText("ရှိ/မဲ့");
							sh6.setText("-");
							sh7.setText("ရှိ/မဲ့");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၆")) {
								sh1.setText("ရှိ/မဲ့");
								sh2.setText("မဲ့");
								sh3.setText("ရှိ");
								sh4.setText("မဲ့");
								sh5.setText("မဲ့/ရှိ");
								sh6.setText("ရှိ");
								sh7.setText("မဲ့");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
								
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၄") && py1.getText().toString().equals("၀")) {
									sh1.setText("ရှိ");
									sh2.setText("မဲ့");
									sh3.setText("-");
									sh4.setText("-");
									sh5.setText("မဲ့/ရှိ");
									sh6.setText("မဲ့");
									sh7.setText("ရှိ");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
									
									
									
									
									
									
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_shi4();
	}
        function _shi4() {
		if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ");
			sh2.setText("ရှိ");
			sh3.setText("မဲ့");
			sh4.setText("-");
			sh5.setText("-");
			sh6.setText("မဲ့/ရှိ");
			sh7.setText("မဲ့");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၂")) {
				sh1.setText("-");
				sh2.setText("မဲ့");
				sh3.setText("မဲ့/ရှိ");
				sh4.setText("ရှိ");
				sh5.setText("မဲ့");
				sh6.setText("မဲ့");
				sh7.setText("ရှိ");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၃")) {
					sh1.setText("ရှိ");
					sh2.setText("မဲ့");
					sh3.setText("ရှိ");
					sh4.setText("ရှိ/မဲ့");
					sh5.setText("မဲ့");
					sh6.setText("ရှိ");
					sh7.setText("မဲ့/ရှိ");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၄")) {
						sh1.setText("မဲ့");
						sh2.setText("မဲ့/ရှိ");
						sh3.setText("မဲ့");
						sh4.setText("ရှိ/မဲ့");
						sh5.setText("ရှိ/မဲ့");
						sh6.setText("-");
						sh7.setText("မဲ့/ရှိ");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၅")) {
							sh1.setText("မဲ့/ရှိ");
							sh2.setText("မဲ့/ရှိ");
							sh3.setText("ရှိ/မဲ့");
							sh4.setText("မဲ့/ရှိ");
							sh5.setText("ရှိ/မဲ့");
							sh6.setText("ရှိ/မဲ့");
							sh7.setText("မဲ့/ရှိ");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၆")) {
								sh1.setText("ရှိ/မဲ့");
								sh2.setText("ရှိ/မဲ့");
								sh3.setText("မဲ့/ရှိ");
								sh4.setText("မဲ့");
								sh5.setText("မဲ့/ရှိ");
								sh6.setText("ရှိ/မဲ့");
								sh7.setText("-");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၅") && py1.getText().toString().equals("၀")) {
									sh1.setText("မဲ့");
									sh2.setText("ရှိ/မဲ့");
									sh3.setText("မဲ့");
									sh4.setText("ရှိ");
									sh5.setText("မဲ့");
									sh6.setText("မဲ့/ရှိ");
									sh7.setText("ရှိ");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
									
									
									
									
									
									
									
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_shi5();
	}
        function _shi5() {
		if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ");
			sh2.setText("မဲ့");
			sh3.setText("ရှိ/မဲ့");
			sh4.setText("မဲ့");
			sh5.setText("ရှိ");
			sh6.setText("မဲ့");
			sh7.setText("မဲ့/ရှိ");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
			
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့");
				sh2.setText("ရှိ");
				sh3.setText("ရှိ");
				sh4.setText("မဲ့");
				sh5.setText("-");
				sh6.setText("-");
				sh7.setText("မဲ့/ရှိ");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၃")) {
					sh1.setText("ရှိ");
					sh2.setText("-");
					sh3.setText("မဲ့");
					sh4.setText("မဲ့/ရှိ");
					sh5.setText("ရှိ");
					sh6.setText("မဲ့");
					sh7.setText("မဲ့");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၄")) {
						sh1.setText("မဲ့/ရှိ");
						sh2.setText("ရှိ");
						sh3.setText("မဲ့");
						sh4.setText("ရှိ");
						sh5.setText("ရှိ/မဲ့");
						sh6.setText("မဲ့");
						sh7.setText("ရှိ");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၅")) {
							sh1.setText("မဲ့/ရှိ");
							sh2.setText("မဲ့");
							sh3.setText("မဲ့/ရှိ");
							sh4.setText("မဲ့");
							sh5.setText("ရှိ/မဲ့");
							sh6.setText("ရှိ/မဲ့");
							sh7.setText("-");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၆")) {
								sh1.setText("မဲ့/ရှိ");
								sh2.setText("မဲ့/ရှိ");
								sh3.setText("မဲ့/ရှိ");
								sh4.setText("ရှိ/မဲ့");
								sh5.setText("မဲ့/ရှိ");
								sh6.setText("ရှိ/မဲ့");
								sh7.setText("ရှိ/မဲ့");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၆") && py1.getText().toString().equals("၀")) {
									sh1.setText("ရှိ");
									sh2.setText("ရှိ/မဲ့");
									sh3.setText("ရှိ/မဲ့");
									sh4.setText("မဲ့/ရှိ");
									sh5.setText("မဲ့");
									sh6.setText("မဲ့/ရှိ");
									sh7.setText("ရှိ/မဲ့");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
									
									
									
									
									
									
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		_shi6();
	}
        function _shi6() {
		if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၁")) {
			sh1.setText("ရှိ/မဲ့");
			sh2.setText("-");
			sh3.setText("ရှိ/မဲ့");
			sh4.setText("ရှိ/မဲ့");
			sh5.setText("မဲ့/ရှိ");
			sh6.setText("မဲ့");
			sh7.setText("မဲ့/ရှိ");
			let builder = dia;
			builder.setTitle("M-SannPro");
			builder.setMessage("(၆+၀)သုတအဖြစ် သက်ရှိဖြစ်ပြီး သူတောအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(၈+၅)ရေဘူးအဖြစ်သက်ရှိဖြစ်ပါတယ်။(၃+၈)ဇာရာအဖြစ် သက်ရှိဖြစ်ပါတယ်။");
			
			
			
			
			
			
			
			
		}
		else {
			if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၂")) {
				sh1.setText("မဲ့/ရှိ");
				sh2.setText("ရှိ");
				sh3.setText("မဲ့");
				sh4.setText("ရှိ/မဲ့");
				sh5.setText("မဲ့");
				sh6.setText("ရှိ");
				sh7.setText("မဲ့");
				let builder = dia;
				builder.setTitle("M-SannPro");
				builder.setMessage("(၂+၈) ကိုရှာအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။");
				
				
				
				
				
				
				
				
				
			}
			else {
				if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၃")) {
					sh1.setText("မဲ့/ရှိ");
					sh2.setText("မဲ့");
					sh3.setText("ရှိ");
					sh4.setText("ရှိ");
					sh5.setText("မဲ့");
					sh6.setText("-");
					sh7.setText("-");
					let builder = dia;
					builder.setTitle("M-SannPro");
					builder.setMessage("(၁+၄)အင်းဝအတွက် သက်မဲ့ဖြစ်ပြီး ဦးဝေအတွက် သက်ရှိဖြစ်ပါတယ်။(၂+၅)ခေမာအတွက် သက်မဲ့၊ဂဗ္ဘေအတွက် ကျား(ရှိ)+မ(မဲ့)ဖြစ်ပါတယ်။");
					
					
					
					
					
					
					
					
				}
				else {
					if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၄")) {
						sh1.setText("မဲ့");
						sh2.setText("ရှိ");
						sh3.setText("-");
						sh4.setText("မဲ့");
						sh5.setText("မဲ့/ရှိ");
						sh6.setText("ရှိ");
						sh7.setText("မဲ့");
						let builder = dia;
						builder.setTitle("M-SannPro");
						builder.setMessage("(၅+၂)မာခေအတွက် သက်ရှိဖြစ်ပြီး ဗ္ဘေဂအတွက် ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
						
						
						
						
						
						
						
						
					}
					else {
						if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၅")) {
							sh1.setText("ရှိ");
							sh2.setText("မဲ့/ရှိ");
							sh3.setText("ရှိ");
							sh4.setText("မဲ့");
							sh5.setText("ရှိ");
							sh6.setText("ရှိ/မဲ့");
							sh7.setText("မဲ့");
							let builder = dia;
							builder.setTitle("M-SannPro");
							builder.setMessage("(၈+၂)ရှာကိုအတွက်ကျား(မဲ့)+မ(ရှိ)ဖြစ်ပါတယ်။");
							
							
							
							
							
							
							
							
						}
						else {
							if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၆")) {
								sh1.setText("-");
								sh2.setText("မဲ့/ရှိ");
								sh3.setText("မဲ့");
								sh4.setText("မဲ့/ရှိ");
								sh5.setText("မဲ့");
								sh6.setText("ရှိ/မဲ့");
								sh7.setText("ရှိ/မဲ့");
								let builder = dia;
								builder.setTitle("M-SannPro");
								builder.setMessage("(၀+၆)တသုအတွက်သက်ရှိဖြစ်ပြီး တောသူအတွက် သက်မဲ့ဖြစ်ပါတယ်။(၅+၈)ဘူးရေအတွက် သက်ရှိဖြစ်ပါတယ်။(၈+၃)ရာဇာအတွက် သက်ရှိဖြစ်ပြီး ရေစအတွက် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
								
								
								
								
								
								
								
								
							}
							else {
								if (at1.getText().toString().equals("၀") && py1.getText().toString().equals("၀")) {
									sh1.setText("ရှိ/မဲ့");
									sh2.setText("မဲ့/ရှိ");
									sh3.setText("မဲ့/ရှိ");
									sh4.setText("မဲ့/ရှိ");
									sh5.setText("ရှိ/မဲ့");
									sh6.setText("မဲ့/ရှိ");
									sh7.setText("ရှိ/မဲ့");
									let builder = dia;
									builder.setTitle("M-SannPro");
									builder.setMessage("(၄+၈)​ဝေရီအဖြစ် သက်ရှိဖြစ်ပြီး (၈+၄)ရီ​ဝေအဖြစ် သက်မဲ့ဖြစ်ပါတယ်။(ဝိပ္ပရိတ်ပြန်ထားပါတယ်။)");
									
									
									
									
									
									
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        function _aa1() {
		if ((currenthour == 12) || ((currenthour == 1) && (30 > currentminute))) {
			if (day.equals("Sunday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Monday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Thursday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Friday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Saturday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa2();
		}
	}
        function _aa2() {
		if (((currenthour > 1) || ((currenthour == 1) && (currentminute > 30))) && ((3 > currenthour) || ((currenthour == 3) && (currentminute == 00)))) {
			if (day.equals("Tuesday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Thursday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Friday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Saturday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Sunday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Monday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa3();
		}
	}
        function _aa3() {
		if (((currenthour > 3) || (currenthour == 3)) && ((4 > currenthour) || ((currenthour == 4) && (30 > currentminute)))) {
			if (day.equals("Thursday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Friday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Saturday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Sunday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Monday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa4();
		}
	}
        function _aa4() {
		if (((currenthour > 4) || ((currenthour == 4) && (currentminute > 30))) && ((6 > currenthour) || ((currenthour == 6) && (currentminute == 00)))) {
			if (day.equals("Saturday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Sunday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Monday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Thursday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Friday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa5();
		}
	}
        function _aa5() {
		if (((currenthour > 6) || (currenthour == 6)) && ((7 > currenthour) || ((currenthour == 7) && (30 > currentminute)))) {
			if (day.equals("Saturday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Sunday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Monday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Thursday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Friday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa6();
		}
	}
        function _aa6() {
		if (((currenthour > 7) || ((currenthour == 7) && (currentminute > 30))) && ((9 > currenthour) || ((currenthour == 9) && (currentminute == 00)))) {
			if (day.equals("Monday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Thursday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Friday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Saturday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Sunday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa7();
		}
	}
        function _aa7() {
		if (((currenthour > 9) || (currenthour == 9)) && ((10 > currenthour) || ((currenthour == 10) && (30 > currentminute)))) {
			if (day.equals("Wednesday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Thursday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Friday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Saturday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Sunday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Monday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			_aa8();
		}
	}
        function _aa8() {
		if (((currenthour > 10) || ((currenthour == 10) && (currentminute > 30))) && ((12 > currenthour) || ((currenthour == 12) && (currentminute == 00)))) {
			if (day.equals("Friday")) {
				c1.setText("၄");
				c2.setText("၁");
				c3.setText("၅");
				c4.setText("၀");
				c5.setText("၃");
				c6.setText("၆");
				c7.setText("၂");
			}
			if (day.equals("Saturday")) {
				c1.setText("၅");
				c2.setText("၂");
				c3.setText("၆");
				c4.setText("၁");
				c5.setText("၄");
				c6.setText("၀");
				c7.setText("၃");
			}
			if (day.equals("Sunday")) {
				c1.setText("၆");
				c2.setText("၃");
				c3.setText("၀");
				c4.setText("၂");
				c5.setText("၅");
				c6.setText("၁");
				c7.setText("၄");
			}
			if (day.equals("Monday")) {
				c1.setText("၀");
				c2.setText("၄");
				c3.setText("၁");
				c4.setText("၃");
				c5.setText("၆");
				c6.setText("၂");
				c7.setText("၅");
			}
			if (day.equals("Tuesday")) {
				c1.setText("၁");
				c2.setText("၅");
				c3.setText("၂");
				c4.setText("၄");
				c5.setText("၀");
				c6.setText("၃");
				c7.setText("၆");
			}
			if (day.equals("Wednesday")) {
				c1.setText("၂");
				c2.setText("၆");
				c3.setText("၃");
				c4.setText("၅");
				c5.setText("၁");
				c6.setText("၄");
				c7.setText("၀");
			}
			if (day.equals("Thursday")) {
				c1.setText("၃");
				c2.setText("၀");
				c3.setText("၄");
				c4.setText("၆");
				c5.setText("၂");
				c6.setText("၅");
				c7.setText("၁");
			}
		}
		else {
			
		}
	}
        function _pakka() {
		if (aa.getText().toString().equals(ak.getText().toString())) {
			if (aa.getText().toString().equals("၁")) {
				textview97.setText("၁ နွေ");
			}
			else {
				if (aa.getText().toString().equals("၂")) {
					textview97.setText("၂ င်္လာ");
				}
				else {
					if (aa.getText().toString().equals("၃")) {
						textview97.setText("၃ င်္ဂါ");
					}
					else {
						if (aa.getText().toString().equals("၄")) {
							textview97.setText("၄ ဟူး");
						}
						else {
							if (aa.getText().toString().equals("၅")) {
								textview97.setText("၅ တေး");
							}
							else {
								if (aa.getText().toString().equals("၆")) {
									textview97.setText("၆ ကြာ");
								}
								else {
									if (aa.getText().toString().equals("၀")) {
										textview97.setText("စနေ");
									}
									else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			if (bb.getText().toString().equals(gk.getText().toString())) {
				if (bb.getText().toString().equals("၁")) {
					textview97.setText("၁ နွေ");
				}
				else {
					if (bb.getText().toString().equals("၂")) {
						textview97.setText("၂ င်္လာ");
					}
					else {
						if (bb.getText().toString().equals("၃")) {
							textview97.setText("၃ င်္ဂါ");
						}
						else {
							if (bb.getText().toString().equals("၄")) {
								textview97.setText("၄ ဟူး");
							}
							else {
								if (bb.getText().toString().equals("၅")) {
									textview97.setText("၅ တေး");
								}
								else {
									if (bb.getText().toString().equals("၆")) {
										textview97.setText("၆ ကြာ");
									}
									else {
										if (bb.getText().toString().equals("၀")) {
											textview97.setText("စနေ");
										}
										else {
											
										}
									}
								}
							}
						}
					}
				}
			}
			else {
				if (cc.getText().toString().equals(fk.getText().toString())) {
					if (cc.getText().toString().equals("၁")) {
						textview97.setText("၁ နွေ");
					}
					else {
						if (cc.getText().toString().equals("၂")) {
							textview97.setText("၂ င်္လာ");
						}
						else {
							if (cc.getText().toString().equals("၃")) {
								textview97.setText("၃ င်္ဂါ");
							}
							else {
								if (cc.getText().toString().equals("၄")) {
									textview97.setText("၄ ဟူး");
								}
								else {
									if (cc.getText().toString().equals("၅")) {
										textview97.setText("၅ တေး");
									}
									else {
										if (cc.getText().toString().equals("၆")) {
											textview97.setText("၆ ကြာ");
										}
										else {
											if (cc.getText().toString().equals("၀")) {
												textview97.setText("စနေ");
											}
											else {
												
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					if (dd.getText().toString().equals(ek.getText().toString())) {
						if (dd.getText().toString().equals("၁")) {
							textview97.setText("၁ နွေ");
						}
						else {
							if (dd.getText().toString().equals("၂")) {
								textview97.setText("၂ င်္လာ");
							}
							else {
								if (dd.getText().toString().equals("၃")) {
									textview97.setText("၃ င်္ဂါ");
								}
								else {
									if (dd.getText().toString().equals("၄")) {
										textview97.setText("၄ ဟူး");
									}
									else {
										if (dd.getText().toString().equals("၅")) {
											textview97.setText("၅ တေး");
										}
										else {
											if (dd.getText().toString().equals("၆")) {
												textview97.setText("၆ ကြာ");
											}
											else {
												if (dd.getText().toString().equals("၀")) {
													textview97.setText("စနေ");
												}
												else {
													
												}
											}
										}
									}
								}
							}
						}
					}
					else {
						if (ee.getText().toString().equals(dk.getText().toString())) {
							if (ee.getText().toString().equals("၁")) {
								textview97.setText("၁ နွေ");
							}
							else {
								if (ee.getText().toString().equals("၂")) {
									textview97.setText("၂ င်္လာ");
								}
								else {
									if (ee.getText().toString().equals("၃")) {
										textview97.setText("၃ င်္ဂါ");
									}
									else {
										if (ee.getText().toString().equals("၄")) {
											textview97.setText("၄ ဟူး");
										}
										else {
											if (ee.getText().toString().equals("၅")) {
												textview97.setText("၅ တေး");
											}
											else {
												if (ee.getText().toString().equals("၆")) {
													textview97.setText("၆ ကြာ");
												}
												else {
													if (ee.getText().toString().equals("၀")) {
														textview97.setText("စနေ");
													}
													else {
														
													}
												}
											}
										}
									}
								}
							}
						}
						else {
							if (ff.getText().toString().equals(ck.getText().toString())) {
								if (ff.getText().toString().equals("၁")) {
									textview97.setText("၁ နွေ");
								}
								else {
									if (ff.getText().toString().equals("၂")) {
										textview97.setText("၂ င်္လာ");
									}
									else {
										if (ff.getText().toString().equals("၃")) {
											textview97.setText("၃ င်္ဂါ");
										}
										else {
											if (ff.getText().toString().equals("၄")) {
												textview97.setText("၄ ဟူး");
											}
											else {
												if (ff.getText().toString().equals("၅")) {
													textview97.setText("၅ တေး");
												}
												else {
													if (ff.getText().toString().equals("၆")) {
														textview97.setText("၆ ကြာ");
													}
													else {
														if (ff.getText().toString().equals("၀")) {
															textview97.setText("စနေ");
														}
														else {
															
														}
													}
												}
											}
										}
									}
								}
							}
							else {
								if (gg.getText().toString().equals(bk.getText().toString())) {
									if (gg.getText().toString().equals("၁")) {
										textview97.setText("၁ နွေ");
									}
									else {
										if (gg.getText().toString().equals("၂")) {
											textview97.setText("၂ င်္လာ");
										}
										else {
											if (gg.getText().toString().equals("၃")) {
												textview97.setText("၃ င်္ဂါ");
											}
											else {
												if (gg.getText().toString().equals("၄")) {
													textview97.setText("၄ ဟူး");
												}
												else {
													if (gg.getText().toString().equals("၅")) {
														textview97.setText("၅ တေး");
													}
													else {
														if (gg.getText().toString().equals("၆")) {
															textview97.setText("၆ ကြာ");
														}
														else {
															if (gg.getText().toString().equals("၀")) {
																textview97.setText("စနေ");
															}
															else {
																
															}
														}
													}
												}
											}
										}
									}
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
		
		
	}
        function _sannkyincolor() {
		if (a.getText().toString().equals(s7.getText().toString())) {
			
			
		}
		else {
			if (b.getText().toString().equals(s6.getText().toString())) {
				
				
			}
			else {
				if (ccc.getText().toString().equals(s5.getText().toString())) {
					
					
				}
				else {
					if (d.getText().toString().equals(s4.getText().toString())) {
						
						
					}
					else {
						if (e.getText().toString().equals(s3.getText().toString())) {
							
							
						}
						else {
							if (f.getText().toString().equals(s2.getText().toString())) {
								
								
							}
							else {
								if (g.getText().toString().equals(s1.getText().toString())) {
									
									
								}
								else {
									
								}
							}
						}
					}
				}
			}
		}
	}
        return {_apha0,_apha1,_apha2,_apha3,_apha4,_apha5,_apha6,_dasaname,_thet,_menu1,_menu2,_sun,_mon,_tuewed,_thurs,_fri,_sat,_rahu,_twt,_sannkyin,_ai,_an,_azitta,_a11,_a22,_a33,_a44,_a55,_a66,_sunaar,_monaar,_tueaar,_wedaar,_tursarr,_friarr,_sataar,_shi,_shi1,_shi2,_shi3,_shi4,_shi5,_shi6,_aa1,_aa2,_aa3,_aa4,_aa5,_aa6,_aa7,_aa8,_pakka,_sannkyincolor};
    }
}
const angaArticles = ["<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>တိုင်ထိပ်</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">တိုင်ထိပ်</h1>\n\n    <div class=\"intro-section\">\n        <p><strong>တိုင်ထိပ်</strong>သည် တစ်နှစ်တာအတွင်း အလိုအလျောက် ဖြစ်ပေါ်လာမည့် အခြေအနေများကို ပြသသည့် နေရာဌာနဖြစ်သည်။ တိုင်ထိပ်တွင် ရှိသော ဂြိုလ်သည် အမှန်တကယ် ဖြစ်လာမည့် အကြောင်းအရာများနှင့် သက်ဆိုင်သည်။</p>\n    </div>\n\n    <h2 class=\"section-title\">တိုင်ထိပ်တွင် ဂြိုလ်များ၏ အကျိုးသက်ရောက်ပုံ</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>မွေးနံဂြိုလ်</h4>\n            <p>မရေရာ၊ မသေချာသော အဖြစ်အပျက်များနှင့် မိသားစုရေးရာ ကိစ္စများ ကြုံတွေ့ရနိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အခြေဂြိုလ်</h4>\n            <p>ဘဝအခြေအနေ ပြောင်းလဲခြင်း၊ အသစ်စတင်ခြင်းများ ဖြစ်ပေါ်နိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အညွှန့်ဂြိုလ်</h4>\n            <p>အကျိုးစီးပွားနှင့် ဘဝရှင်သန်မှုဆိုင်ရာ ကိစ္စရပ်များ ကြုံတွေ့ရနိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>စတုရန်းဂြိုလ်</h4>\n            <p>ရုပ်ပိုင်းဆိုင်ရာနှင့် စိတ်ပိုင်းဆိုင်ရာ ထိခိုက်ဒဏ်ရာများ ခံစားရနိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ပဉ္စပွတ်ဂြိုလ်</h4>\n            <p>ဘဝအောင်မြင်မှုနှင့် တိုးတက်မှုများ ရရှိနိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ဆပွတ်ဂြိုလ်</h4>\n            <p>ချစ်ခင်နှစ်သက်ရသူများ၊ အိမ်ထောင်ဖက်နှင့် ပတ်သက်သော ကိစ္စများ ကြုံတွေ့ရနိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>တြိရန်းဂြိုလ်</h4>\n            <p>ပျက်စီးဆုံးရှုံးမှု၊ အစားထိုးခြင်းနှင့် လျော်ကြေးပေးရခြင်း စသည်တို့ ဖြစ်ပေါ်နိုင်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ဂဟပတိဂြိုလ်</h4>\n            <p>ကံကောင်းခြင်း၊ အမွေရခြင်း စသည့် ပိုင်ဆိုင်မှုများ ရရှိတတ်သည်။</p>\n        </div>\n    </div>\n\n    <h2 class=\"section-title\">တိုင်ထိပ်၏ ဖြစ်ရပ်များကို ခန့်မှန်းခြင်း</h2>\n    <div class=\"section\">\n        <p>တိုင်ထိပ်တွင်ရှိသော ဂြိုလ်ကို အောက်ပါ ၄ ချက်ဖြင့် အဓိပ္ပာယ်ဖွင့်ဆိုရမည်။</p>\n        <ul>\n            <li><strong>အင်္ဂဝိဇ္ဇာအရ</strong> (ဂြိုလ်၏ အခြေခံ သဘောတရား)</li>\n            <li><strong>အဌလဂ်အရ</strong> (ဇာတာခွင်တွင်ရှိသော နေရာ)</li>\n            <li><strong>ကာရကအရ</strong> (ဂြိုလ်၏ အဓိက ကိုယ်စားပြုမှု)</li>\n            <li><strong>ကာယကံရှင်၏ တော်စပ်မှုအရ</strong> (ပုဂ္ဂိုလ်ရေးဆိုင်ရာ ဆက်နွှယ်မှု)</li>\n        </ul>\n    </div>\n\n    <h2 class=\"section-title\">ကောင်းကျိုး၊ ဆိုးကျိုးနှင့် ယတြာ</h2>\n    <div class=\"note\">\n        <p><strong>ကောင်းသည်၊ ဆိုးသည်ကို ဆုံးဖြတ်ခြင်း:</strong> တိုင်ထိပ်ဂြိုလ်၏ အကျိုးသက်ရောက်မှုသည် ကပ်ဂြိုလ်၏ ကောင်းခြင်း၊ ဆိုးခြင်းအပေါ် မူတည်သည်။</p>\n        <ul>\n            <li>ကပ်ဂြိုလ်ကောင်းပါက ကောင်းကျိုးများ ရရှိနိုင်ပြီး၊</li>\n            <li>ကပ်ဂြိုလ်မကောင်းပါက (ဥပမာ- မရဏ၊ ဆန်းကျင်၊ ကိစ္ဆဂြိုလ်များ) ရရှိမည့်ကံများ လွဲချော်ခြင်း၊ ရပြီးပြန်ကုန်ခြင်းများ ဖြစ်တတ်သည်။</li>\n        </ul>\n    </div>\n    <div class=\"note\">\n        <p><strong>ယတြာ၏ အခန်းကဏ္ဍ:</strong> တိုင်ထိပ်တွင် ဖြစ်ပေါ်လာမည့် အရာများကို လုံးဝရှောင်လွဲ၍ မရနိုင်ပါ။ သို့သော် အင်အားမပြင်းထန်အောင် <strong>အနိဌယတြာ</strong> ပြုလုပ်၍ ကာကွယ်နိုင်သည်။ ယတြာ နောက်ကျပါက သို့မဟုတ် မပြုလုပ်ပါက ရသင့်သည့်အရာများနှင့် လွဲချော်နိုင်သည်။</p>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'ပြ ဌာန' အကြောင်း</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">'ပြ ဌာန' ၏ အဓိပ္ပာယ်</h1>\n\n    <p>\n        'ပြ' သည် မိမိပိုင်ဆိုင်မှုမဟုတ်ဘဲ သူတစ်ပါးအတွက်၊ သူတစ်ပါးကြောင့် အနစ်နာခံရခြင်း သို့မဟုတ် အနာပေါက်ရခြင်းကို ကိုယ်စားပြုသည်။\n        ဤဌာနသည် ဖွင့်ဟပြောပြလို့မဖြစ်သည့်အရာများ၊ စိတ်ထဲတွင် ကြိတ်မှိတ်ခံစားနေရသော ကိစ္စများနှင့် သက်ဆိုင်သည်။\n    </p>\n\n    <h2 class=\"section-title\">'ပြ' ဌာနတွင် ဂြိုဟ်များရှိပါက အကျိုးသက်ရောက်ပုံ</h2>\n\n    <p>\n        ပြ ဌာနတွင် ရှိသော ဂြိုဟ်သည် မိမိပိုင်ဆိုင်မှုမဟုတ်ဘဲ သူတစ်ပါးနှင့် သက်ဆိုင်သော အရာအဖြစ် သတ်မှတ်နိုင်သည်။\n    </p>\n\n    <h3>ဥပမာ:</h3>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ဂြိုဟ်၏ အကျိုးသက်ရောက်ပုံများ</h4>\n            <ul>\n                <li>တနင်္လာဂြိုဟ် (ငွေ) ရှိပါက ကိုယ်ပိုင်ငွေမဟုတ်သော သူတစ်ပါး၏ငွေ။</li>\n                <li>တနင်္လာဂြိုဟ် (ဆပွတ်) ရှိပါက မိမိအိမ်ထောင်ဖက်မဟုတ်သော သူတစ်ပါး၏အိမ်ထောင်ဖက်။</li>\n                <li>တနင်္လာဂြိုဟ် (ဌာန) ရှိပါက မိမိဌာနမဟုတ်သော သူတစ်ပါး၏ဌာန။</li>\n                <li>မွေးနံဂြိုဟ် ရှိပါက မိမိကိုယ်ကို မပိုင်တော့ဘဲ သူတစ်ပါးအလိုကျ ကြိုးဆွဲချထားသည့် အရုပ်သဖွယ် ဖြစ်နေခြင်း။</li>\n                <li>ဘုမ္မိ၊ တေဇ၊ အာပါဒါန် ဂြိုဟ်များ ရှိပါက မိမိလုပ်သမျှ၊ ကြိုးစားသမျှသည် သူတစ်ပါးအတွက် ဖြစ်သွားခြင်း။</li>\n            </ul>\n        </div>\n    </div>\n    \n    <h2 class=\"section-title\">ကောင်းကျိုးနှင့် ဆိုးကျိုး</h2>\n    <p>\n        ကပ်ဂြိုဟ်ကောင်းပါက ခံစားရမှု နည်းပါးမည်။\n        ကပ်ဂြိုဟ်မကောင်းပါက ခံစားရမှု ပိုမိုပြင်းထန်မည်။\n    </p>\n\n    <div class=\"note\">\n        <p>အချုပ်အားဖြင့်ဆိုရသော် 'ပြ ဌာန' သည် တစ်ဦးတစ်ယောက်အတွက် မဟုတ်ဘဲ သူတစ်ပါးနှင့် ပတ်သက်ပြီး ကြိတ်မှိတ်ခံစားရသော အရာများ၊ ဖွင့်ပြောမရသော ကိစ္စရပ်များကို ပြသနေသည်။</p>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'တန်းစီး' အကြောင်း</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">တန်းစီးဆိုသည်မှာ</h1>\n\n    <p>\n        <strong>တန်းစီး</strong> သည် ကြိုးစားအားထုတ်မှုကြောင့် ဖြစ်ပေါ်လာသည့် အကျိုးရလဒ်များကို ပြသသည့် နေရာဖြစ်သည်။ \n        တိုင်ထိပ်ကဲ့သို့ပင် အဝင်ဌာနဖြစ်သော်လည်း တိုင်ထိပ်သည် အလိုအလျောက် ဖြစ်ခြင်းကို ကိုယ်စားပြုပြီး တန်းစီးသည် မိမိကိုယ်တိုင် ကြိုးစားမှသာ ဝင်ရောက်လာခြင်းကို ကိုယ်စားပြုသည်။\n        တစ်နည်းအားဖြင့် တန်းစီးကို မိမိကံကြမ္မာ မိမိဖန်တီးခြင်းဟုလည်း အဓိပ္ပာယ်ဖွင့်ဆိုနိုင်သည်။\n    </p>\n\n    <h2 class=\"section-title\">တန်းစီးတွင် ဂြိုဟ်များ၏ အကျိုးသက်ရောက်ပုံ</h2>\n    <p>\n        တန်းစီးတွင် ရှိသော ဂြိုဟ်သည် ထိုသက်ရောက်ကာလအတွင်း မိမိ လှုပ်ရှားရုန်းကန်ရမည့် အရာများကို ပြသသည်။ ၎င်းဂြိုဟ်နှင့် သက်ဆိုင်သည့် ကိစ္စရပ်များကို ကြိုးစားအားထုတ်မှသာ အောင်မြင်မှုရရှိမည်။\n    </p>\n\n    <h3>ဥပမာ:</h3>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ဂြိုဟ်အလိုက် အကျိုးသက်ရောက်ပုံများ</h4>\n            <ul>\n                <li><strong>မွေးနံဂြိုဟ်</strong> ရှိပါက မိသားစုအတွက် ကြိုးစားရမည်။</li>\n                <li><strong>အညွှန့်ဂြိုဟ်</strong> ရှိပါက အကျိုးစီးပွားအတွက် ကြိုးစားရမည်။</li>\n                <li><strong>တြိရန်းဂြိုဟ်</strong> ရှိပါက ပျက်စီးဆုံးရှုံးမှု ဖြစ်ပေါ်လာရန် မိမိကိုယ်တိုင် ကြိုးစားနေခြင်းဖြစ်နိုင်သည်။ (ထို့ကြောင့် ရှောင်ရှားရမည်)</li>\n            </ul>\n        </div>\n    </div>\n    \n    <p>တန်းစီးရှိ ဂြိုဟ်ကို မိမိ မလိုချင်ပါက ထိုဂြိုဟ်နှင့် သက်ဆိုင်သည့် အလုပ်များကို ရှောင်ရှားရမည်။</p>\n\n    <h2 class=\"section-title\">တိုင်ထိပ်နှင့် တန်းစီး ဆက်စပ်မှု</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>အဟောပိုင်း</h4>\n            <p>တန်းစီးတွင် ကြိုးစားအားထုတ်ခြင်းကြောင့်သာ တိုင်ထိပ်မှ အလိုအလျောက် ဖြစ်ပေါ်လာမည့် ရလဒ်များ ဖြစ်လာနိုင်သည်။ ထို့ကြောင့် ဗေဒင်ဟောပြောရာတွင် ဤအချက်နှစ်ခုကို ချိတ်ဆက်ဟောပြောရန် လိုအပ်သည်။</p>\n        </div>\n        \n        <div class=\"grid-item\">\n            <h4>ကပ်ဂြိုဟ်</h4>\n            <p>တန်းစီးနှင့် တိုင်ထိပ်၏ ရလဒ်များပေါ်တွင် ကပ်ဂြိုဟ်က သက်ရောက်မှုရှိသည်။ ကောင်းကျိုးဖြစ်စေမည့် ကပ်ဂြိုဟ်ရှိပါက အကျိုးပေးမြန်ဆန်ပြီး၊ ဆိုးကျိုးဖြစ်စေမည့် ကပ်ဂြိုဟ်များ (ဒွယ၊ ကိစ္ဆ၊ မရဏ၊ ဗျယ) ရှိပါက ရလဒ်များ နှေးကွေးခြင်း၊ လွဲချော်ခြင်း၊ သို့မဟုတ် အကြိမ်ကြိမ်ဖြစ်ခြင်းမျိုးများ ကြုံတွေ့ရနိုင်သည်။</p>\n        </div>\n    </div>\n    \n    <h2 class=\"section-title\">ခန့်မှန်းရာတွင် ထည့်သွင်းစဉ်းစားရမည့်အချက်များ</h2>\n    <p>\n        ဗေဒင်ပညာရှင်တစ်ဦးသည် တန်းစီးနှင့်ပတ်သက်သော အဟောများ ပြုလုပ်ရာတွင် အောက်ပါအချက်များကို အသေးစိတ်လေ့လာသင့်သည်။\n    </p>\n    <ul>\n        <li>သက်ရောက်တိုင်၏ အဓိပ္ပာယ်</li>\n        <li>အင်္ဂဝိဇ္ဇာအရ အဓိပ္ပာယ်ဖွင့်ဆိုခြင်း</li>\n        <li>ဂြိုဟ်ပရိယာယ်၊ အဋ္ဌလဂ်၊ ကာရကတို့အရ အဓိပ္ပာယ်ဖော်ခြင်း</li>\n        <li>မိတ်၊ ရန်၊ ဥဒါသိန် စသော ဆက်နွယ်မှုများ</li>\n        <li>မူလမဟာဘုတ်နှင့် ကောဇာမဟာဘုတ်တို့၏ ဂြိုဟ်တည်နေရာ</li>\n    </ul>\n\n    <div class=\"note\">\n        <p>တန်းစီးနှင့် သက်ရောက်တိုင်တစ်ခု၏ သက်တမ်းမှာ ၄၅ ရက်ဖြစ်ပြီး ထိုကာလအတွင်း ရလဒ်များ ဖြစ်ပေါ်နိုင်သည်။ တန်းစီးတွင် ကောင်းသောဂြိုဟ်များရှိပါက ၎င်းတို့ကို အကောင်းဆုံးအသုံးချနိုင်ရန် အချိန်ကောင်းများကို ဗေဒင်ပညာရှင်က လမ်းညွှန်ပေးနိုင်သည်။</p>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'တန်းကပ်' အကြောင်း</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">'တန်းကပ်' ဆိုသည်မှာ</h1>\n\n    <p>\n        'တန်းကပ်' သည် အထွက်ဌာနဖြစ်ပြီး မထိရ၊ မကိုင်ရ၊ မဝင်ရသော နေရာဖြစ်သည်။ တန်းကပ်တွင် ဝင်လာသောအရာများသည် မကြာမီ ပြန်ထွက်သွားလေ့ရှိသည်။ ၎င်းသည် မတည်ငြိမ်၊ ရွေ့လျားပြောင်းလဲတတ်သည့် နေရာဖြစ်ပြီး၊ မမျှော်လင့်ဘဲ ထိခိုက်ပျက်စီးမှုများ ဖြစ်ပေါ်စေနိုင်သည်။\n    </p>\n\n    <h2 class=\"section-title\">တန်းကပ်တွင် ဂြိုဟ်များရှိပါက အကျိုးသက်ရောက်ပုံ</h2>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>မွေးနံဂြိုဟ် တန်းကပ်တွင်ရှိပါက-</h4>\n            <ul>\n                <li>စိတ်မငြိမ်မသက်ဖြစ်နေတတ်သည်။</li>\n                <li>အိမ်နှင့် မိသားစုရေးရာတွင် မတည်မငြိမ်ဖြစ်တတ်သည်။</li>\n                <li>အပေါင်းအသင်းများ မမြဲတတ်ပေ။</li>\n            </ul>\n        </div>\n        <div class=\"grid-item\">\n            <h4>အာယုဂြိုဟ် တန်းကပ်တွင်ရှိပါက-</h4>\n            <ul>\n                <li>ကျန်းမာရေးမငြိမ်မသက်ဖြစ်နေတတ်သည်။</li>\n                <li>ကျန်းမာရေးကို ပေါ့လျော့နေတတ်သည်။</li>\n                <li>ဘဝရပ်တည်မှု မတည်ငြိမ်ဖြစ်နေတတ်သည်။</li>\n            </ul>\n        </div>\n    </div>\n\n    <p>\n        တန်းကပ်တွင်ရှိသော ဂြိုဟ်သည် ထိုနှစ်အတွက် စန်းစန်းတင့်နေသည့် ဂြိုဟ်ဖြစ်သော်လည်း အခန့်မသင့်ပါက ထိခိုက်ပျက်စီးမှုများ ဖြစ်ပေါ်နိုင်သော အနေအထားရှိသည်။\n    </p>\n    <p>\n        တန်းကပ်တွင်ရှိသော ဂြိုဟ်ကို အဓိပ္ပာယ်ဖွင့်ဆိုရာတွင် အင်္ဂဝိဇ္ဇာမူအရ၊ အဋ္ဌလဂ်အရ၊ ကာရကအရ၊ ပက္ခအရ၊ မူလမဟာဘုတ်နှင့် ကောဇာမဟာဘုတ်တို့အရ စသည်ဖြင့် အဆင့်ဆင့် ခွဲခြမ်းစိတ်ဖြာရန် လိုအပ်သည်။\n    </p>\n\n    <h2 class=\"section-title\">တန်းကပ်၏ သဘောတရား</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ပြန်ထွက်သွားခြင်း</h4>\n            <p>တန်းကပ်တွင် ဂြိုဟ်တစ်ခုခုဝင်လာပါက ထိုဂြိုဟ် သို့မဟုတ် ဂြိုဟ်ပရိယာယ်တူသော အရာများ ပြန်ထွက်သွားတတ်သည်။ ဥပမာ- တနင်္ဂနွေဂြိုဟ် (ရတနာ၊ အဖေ) တန်းကပ်တွင်ရှိပါက ရတနာဝင်လာနိုင်သော်လည်း မကြာမီ ပြန်ရောင်းရခြင်း၊ လှူဒါန်းရခြင်း သို့မဟုတ် အဖေနှင့်ပတ်သက်သော ကိစ္စများ ဖြစ်ပေါ်တတ်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ကပ်ဂြိုဟ်၏ အခန်းကဏ္ဍ</h4>\n            <p>ကပ်ဂြိုဟ်ကောင်းပါက (ဥပမာ- ဇေယျ၊ ဝရ၊ လာဘ) ပြန်ထွက်သည့်အခါ အကျိုးအမြတ်ပိုမိုရရှိနိုင်ပြီး၊ မကောင်းပါက အဆိုးဘက်သို့ ဦးတည်နိုင်သည်။</p>\n        </div>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'နိစ်လေး' အကြောင်း</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">'နိစ်လေး' ဆိုသည်မှာ</h1>\n\n    <p>\n        'နိစ်လေး' သည် အမြင့်က ပြုတ်ကျခြင်းကို ကိုယ်စားပြုသည်။ \n        ၎င်းသည် ရုပ်ပိုင်းဆိုင်ရာ သို့မဟုတ် စိတ်ပိုင်းဆိုင်ရာ ထိခိုက်ဒဏ်ရာများ၊ ယိုယွင်းပျက်စီးမှုများ ဖြစ်ပေါ်နိုင်သည့် နေရာဖြစ်သည်။\n        နိစ်လေးတွင် ရပ်တည်သော ဂြိုဟ်သည် ထိုနှစ်အတွင်း ရန်လိုခြင်း၊ စိတ်တိုခြင်းတို့ကို ဖြစ်ပေါ်စေသည်။\n    </p>\n\n    <h2 class=\"section-title\">နိစ်လေးတွင် ဂြိုဟ်များရှိပါက အကျိုးသက်ရောက်ပုံ</h2>\n\n    <p>\n        နိစ်လေးတွင်ရှိသော ဂြိုဟ်သည် မိမိအတွက် ရုပ်ပိုင်း သို့မဟုတ် စိတ်ပိုင်းဆိုင်ရာ ထိခိုက်ဒဏ်ရာတစ်မျိုးမျိုးကို ဖြစ်ပေါ်စေနိုင်သည်။\n    </p>\n\n    <h3>နိစ်လေးရှိ ဂြိုဟ်အလိုက် အကျိုးသက်ရောက်မှုများ</h3>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>အကျိုးသက်ရောက်မှုများ</h4>\n            <ul>\n                <li><strong>မွေးနံဂြိုဟ်:</strong> ယှဉ်ပြိုင်တိုက်ခိုက်မှုကြောင့် ရုပ်၊ စိတ်ဒဏ်ရာရခြင်း။</li>\n                <li><strong>အခြေဂြိုဟ်:</strong> ဘဝရပ်တည်မှု မခိုင်မာဘဲ ပြောင်းလဲရခြင်း။</li>\n                <li><strong>အညွှန့်ဂြိုဟ်:</strong> အကျိုးအမြတ်နစ်နာဆုံးရှုံးခြင်း၊ စိတ်ပင်ပန်းရခြင်း။</li>\n                <li><strong>နာဂရဂြိုဟ်:</strong> မိသားစု သို့မဟုတ် ပတ်ဝန်းကျင်ကြောင့် စိတ်ထိခိုက်ခံစားရခြင်း။</li>\n                <li><strong>ဂဟပတိဂြိုဟ်:</strong> ပိုင်ဆိုင်မှုဥစ္စာပစ္စည်းနှင့်ပတ်သက်ပြီး စိတ်ဒဏ်ရာရခြင်း။</li>\n                <li><strong>သီရိဂြိုဟ်:</strong> အရှက်နှင့် ဂုဏ်သိက္ခာ ထိပါးစော်ကားခံရခြင်း။</li>\n                <li><strong>တြိရန်းဂြိုဟ်:</strong> တစ်ခုခုပျက်စီးဆုံးရှုံးခြင်းကြောင့် စိတ်ဒဏ်ရာရခြင်း။</li>\n                <li><strong>အာယုဂြိုဟ်:</strong> ဖြစ်ပေါ်လာသော ရောဂါများ ပြင်းထန်ပြီး စိုးရိမ်ပူပန်မှုများ ဖြစ်စေခြင်း။</li>\n                <li><strong>ဌာနဂြိုဟ်:</strong> နေရာထိုင်ခင်း သို့မဟုတ် အလုပ်အကိုင်အတွက် စိတ်ဆင်းရဲရခြင်း။</li>\n                <li><strong>တေဇဂြိုဟ်:</strong> လုပ်သမျှအဆင်မပြေခြင်း၊ လုပ်တိုင်းမဖြစ်ခြင်း။</li>\n                <li><strong>ဘုမ္မိဂြိုဟ်:</strong> မိမိအစွမ်းသတ္တိကို အလွဲသုံးစားပြုမိပြီး ဒုက္ခရောက်ခြင်း။ တစ်ပါးသူ၏ပြဿနာကြောင့် ဒုက္ခရောက်ခြင်း။</li>\n            </ul>\n        </div>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'နိစ်ကြီး' အကြောင်း</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">'နိစ်ကြီး' ဆိုသည်မှာ</h1>\n\n    <p>\n        'နိစ်ကြီး' သည် အကျဉ်းကျ၊ ပိတ်မိခြင်း၊ ရုန်းထွက်မရခြင်းကို ကိုယ်စားပြုသည်။ \n        ၎င်းသည် လှောင်အိမ်ထဲရောက်နေသော ဂြိုဟ် သို့မဟုတ် လူတစ်ဦးကဲ့သို့ ရုန်းလေ နစ်လေ ဖြစ်တတ်သော နေရာဖြစ်သည်။\n        ထို့ကြောင့် နိစ်ကြီးတွင် ရှိသော ဂြိုဟ်နှင့် သက်ဆိုင်သည့် ကိစ္စများအတွက် အထူးကြိုးစားအားထုတ်ပါက ပိုမိုဆိုးရွားသော အခြေအနေများ ကြုံတွေ့ရတတ်သည်။\n    </p>\n\n    <h2 class=\"section-title\">နိစ်ကြီးတွင် ဂြိုဟ်များရှိပါက အကျိုးသက်ရောက်ပုံ</h2>\n\n    <p>\n        နိစ်ကြီးတွင်ရှိသော ဂြိုဟ်သည် ထိုနှစ်အတွင်း မည်သည့်အရာနှင့် ပတ်သက်၍ အကျဉ်းကျ၊ ပိတ်မိသည်ဟု ခံစားရမည်ကို ဖော်ပြသည်။\n    </p>\n\n    <h3>ဥပမာ:</h3>\n\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>အကျိုးသက်ရောက်မှု</h4>\n            <ul>\n                <li><strong>ဌာနဂြိုဟ်</strong> နိစ်ကြီးတွင်ရောက်ရှိပါက လက်ရှိနေထိုင်ရာ သို့မဟုတ် အလုပ်နေရာတွင် စိတ်ဆင်းရဲစရာများ ကြုံတွေ့ရတတ်သည်။ ထိုအခြေအနေမှ ရုန်းထွက်ရန် ကြိုးစားပါက ပိုမိုဆိုးရွားနိုင်သောကြောင့် အလိုက်အထိုက် နေထိုင်သင့်သည်။</li>\n            </ul>\n        </div>\n    </div>\n\n    <p>\n        <strong>ကပ်ဂြိုဟ်၏ ကာရက (လုပ်ဆောင်ပုံ)</strong> သည် မည်သည့်အကြောင်းအရာကို လုပ်ဆောင်မိခြင်းကြောင့် ဒုက္ခရောက်မည်ကို ဖော်ပြသည်။\n    </p>\n\n    <div class=\"note\">\n        <p>အချုပ်အားဖြင့်ဆိုရသော် 'နိစ်ကြီး'သည် ရုန်းလေ နစ်လေ သဘောတရားအတိုင်း မိမိပိတ်မိနေသော အခြေအနေများကို ပြသပြီး ၎င်းကိုကျော်လွှားရန် အတင်းအကျပ် ရုန်းကန်ခြင်းထက် လက်ခံထားခြင်းကသာ ပိုမိုသင့်လျော်သည်။</p>\n    </div>\n\n</body>\n</html>\n", "<!DOCTYPE html>\n<html lang=\"my\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>'တိုင်ခြေ' ဆိုသည်မှာ</title>\n    <style>\n        body {\n            font-family: 'Myanmar3', 'Noto Sans Myanmar', serif;\n            line-height: 1.8;\n            color: #333;\n            background-color: #f4f4f2;\n            padding: 20px;\n            max-width: 800px;\n            margin: auto;\n        }\n        h1, h2, h3 {\n            color: #5d4037;\n            font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n            border-bottom: 2px solid #5d4037;\n            padding-bottom: 5px;\n        }\n        .main-title {\n            text-align: center;\n            font-size: 2.5em;\n            margin-bottom: 30px;\n            text-shadow: 2px 2px 4px #aaa;\n        }\n        .section-title {\n            font-size: 1.8em;\n            margin-top: 40px;\n            background-color: #e0e0d8;\n            padding: 10px;\n            border-left: 5px solid #8d6e63;\n        }\n        .grid-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 20px;\n            margin-top: 20px;\n        }\n        .grid-item {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n        .grid-item h4 {\n            color: #8d6e63;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n            margin-top: 0;\n        }\n        ul {\n            list-style-type: none;\n            padding-left: 0;\n        }\n        ul li {\n            margin-bottom: 10px;\n            padding-left: 20px;\n            position: relative;\n        }\n        ul li::before {\n            content: '•';\n            position: absolute;\n            left: 0;\n            color: #4CAF50;\n        }\n        .note {\n            background-color: #fff3e0;\n            border-left: 4px solid #ff9800;\n            padding: 15px;\n            margin-top: 30px;\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n\n    <h1 class=\"main-title\">'တိုင်ခြေ' ဆိုသည်မှာ</h1>\n\n    <p>\n        <strong>'တိုင်ခြေ'</strong> သည် ပျက်စီးခြင်း၊ ဆုံးရှုံးခြင်း၊ အစားထိုးခြင်းနှင့် လျော်ကြေးပေးရခြင်းတို့ကို ကိုယ်စားပြုသည်။ \n        ၎င်းသည် နားလည်ရန် အခက်ခဲဆုံးနေရာဖြစ်သော်လည်း ကျွမ်းကျင်ပါက ဟောပြောချက်တွင် အဓိကကျသော နေရာတစ်ခုဖြစ်သည်။ \n        တိုင်ခြေသည် အတိတ်က ဖြစ်ခဲ့ပြီးသော အကြောင်းအရာများကိုလည်း ရည်ညွှန်းသည်။ အဝေးနှင့် နိုင်ငံရပ်ခြားသို့ သွားရောက်ခြင်းများကိုလည်း ဖော်ပြနိုင်သည်။\n    </p>\n\n    <h2 class=\"section-title\">တိုင်ခြေ၏ သဘောတရား</h2>\n    <div class=\"grid-container\">\n        <div class=\"grid-item\">\n            <h4>ပြန်ဝင်တတ်သော သဘော</h4>\n            <p>တိုင်ခြေ၏ ထူးခြားချက်မှာ အရာတစ်ခု ထွက်သွားပြီးမှသာ ပြန်ဝင်တတ်သော သဘောရှိခြင်းဖြစ်သည်။ ဥပမာ- ပစ္စည်းတစ်ခု ဆုံးရှုံးပြီးမှသာ အစားထိုးပစ္စည်းတစ်ခု ပြန်လည်ရရှိခြင်းမျိုး ဖြစ်တတ်သည်။</p>\n        </div>\n        <div class=\"grid-item\">\n            <h4>ပြုပြင်ပြောင်းလဲနိုင်ခြင်း</h4>\n            <p>တိုင်ခြေသည် ပြုပြင်ပြောင်းလဲနိုင်ခြင်း၊ ရုန်းကန်နိုင်ခြင်းနှင့် လွတ်မြောက်နိုင်ခြင်း သဘောရှိသည်။ 'နိစ်ကြီး' ကဲ့သို့ ရုန်းလေ နစ်လေ မဟုတ်ဘဲ ပြုလုပ်မှုအပေါ် မူတည်၍ ကောင်းမွန်သော ရလဒ်များ ရနိုင်သည်ဟု ဆိုလိုသည်။</p>\n        </div>\n    </div>\n    \n    <div class=\"note\">\n        <p>ပျက်စီးဆုံးရှုံးမှုကို ကြိုတင်ကာကွယ်လိုပါက ယတြာပြုလုပ်ခြင်းဖြင့် အကျိုးသက်ရောက်မှုများကို လျော့ပါးသက်သာစေနိုင်သည်။</p>\n    </div>\n\n</body>\n</html>\n"];
function msannAngaArticle(index) { return { html: angaArticles[index] || "" }; }
const partnerReadings = {"၀": {"တနင်္ဂနွေ": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n", "တနင်္လာ": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n", "အင်္ဂါ": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n", "ဗုဒ္ဓဟူး": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "ကြာသပတေး": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "သောကြာ": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။", "စနေ": "ဘင်္ဂနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။\n\n"}, "၁": {"တနင်္ဂနွေ": "ဘင်္ဂနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။\n\n", "တနင်္လာ": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n", "အင်္ဂါ": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n", "ဗုဒ္ဓဟူး": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n", "ကြာသပတေး": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "သောကြာ": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "စနေ": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။"}, "၂": {"တနင်္ဂနွေ": "အထွန်းနေ့သားသမီး\n\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။\n\n", "တနင်္လာ": "ဘင်္ဂနေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။", "အင်္ဂါ": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n", "ဗုဒ္ဓဟူး": "သိုက်နေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။", "ကြာသပတေး": "မရဏနေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။", "သောကြာ": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "စနေ": "ရာဇနေ့သားသမီး\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။"}, "၃": {"တနင်္ဂနွေ": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "တနင်္လာ": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။", "အင်္ဂါ": "ဘင်္ဂနေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။", "ဗုဒ္ဓဟူး": "ပုတိနေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။", "ကြာသပတေး": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n", "သောကြာ": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n", "စနေ": "အဓိပတိနေ့သားသမီး\n\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။\n\n"}, "၄": {"တနင်္ဂနွေ": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "တနင်္လာ": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "အင်္ဂါ": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။", "ဗုဒ္ဓဟူး": "ဘင်္ဂနေ့သားသမီး\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။", "ကြာသပတေး": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n", "သောကြာ": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n", "စနေ": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n"}, "၅": {"တနင်္ဂနွေ": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n", "တနင်္လာ": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "အင်္ဂါ": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "ဗုဒ္ဓဟူး": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။", "ကြာသပတေး": "ဘင်္ဂနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။\n\n", "သောကြာ": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n", "စနေ": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n"}, "၆": {"တနင်္ဂနွေ": "သိုက်နေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက သိုက်နေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် စည်းကမ်းရှိပြီး စကားတတ်တဲ့ အိမ်ထောင်ဖက်နဲ့ရမယ်။ အပြောအဆို လိမ္မာပါးနပ် ပြီး ကိုယ့်ဘက်ကို ဆွယ်တတ်မယ်။ စည်းကမ်းမှာ တော်မယ်။ ကိုယ့်ကို ဆရာလုပ် တတ်မယ်။ တကယ် လို့များ ကိုယ်ကသိပ်စကားမပြောတတ်ဘူး၊ အေးဆေး တည်ငြိမ်စွာ နေတတ်မယ်၊ နားအေးပါးအေးနေတတ်မယ်ဆိုရင် သိုက်နေ့သားသမီး ကိုယူတာ အကောင်းဆုံးပါပဲ။ ဒါပေမယ့် အိမ်ပါသမက် (သို့) ကိုယ့်အိမ်ပေါ်တက်လာ နေတဲ့ မိန်းမဆိုရင်တော့ သိပ်မကောင်းဘူး။ နှစ်ဘက်လူကြီးမတွေနဲ့ မပြေလည်လို့ မကြာခဏစကားများမယ်။ သိုက်နေ့သမီးနဲ့အိမ်ထောင်ကျခြင်းဟာ လက်ထိပ်ခတ်ခံ ရတဲ့အိမ်ထောင်ရေးသုခလို့ ခေါ်ပါတယ်။ ကိုယ့်ကို လွှမ်းမိုးဖို့ ကြိုးစားမယ်။ ဆရာ လုပ်တတ်မယ်။ ကိုယ့်ကို သိမ်းသွင်းစည်းရုံးတဲ့နေရာမှာအရမ်း လိမ္မာတယ်။\n\n\nမိသားစုသိုက်သိုက်ဝန်းဝန်းနေရမယ်။ သားသမီးများတတ် မယ်။ အခြွေအရံ ဆွေမျိုးမိသားစုများနဲ့ နေရတတ်တယ်။ ဒီအိမ်ထောင်ကိုပြုပြီးသွားရင် ငွေစုလို့ရ မယ်။ စီးပွားဖြစ်မယ်။ ကြိုးစားတာတွေအားလုံးအောင်မြင်မယ်။\n\n\nစိတ်ဆတ်တဲ့အိမ်ထောင်ဖက်မျိုးဖြစ်ရင်တော့ သိပ်မကောင်း ဘူး။ စကားများရ လိမ့်မယ်။ ရောဂါတော့နည်းနည်းထူမယ်။ ကလေး မလိုချင်တတ်ပါ။ကလေးအတွက် ဒုက္ခမခံချင်ပါ။မကြာခဏစိတ်ပျက် တတ်တဲ့စကားတွေ အလိုမပြည့်တဲ့စကားတွေ နှိုင်းယှဉ်ပြောခံရတဲ့စကားတွေ ပြောတတ်လိမ့်မယ်။ ညည်းတာဝါသနာပါမယ်။\n\nကလေးရခဲ့ရင်လဲငယ်ငယ်မှာချူချာမယ်။ နည်းနည်းကြီးမှ ကျန်းမာရေးကောင်း မယ်။ အိမ်ထောင်သက်ငါးနှစ်ကျော်မှ အခြေ ကျမယ်။ အားလုံးကိစ္စတွေ အဆင်ပြေ မယ်။ အိမ်လည်တာတော့ ဝါသနာမပါတတ်ပေမယ့် ကိုယ့်အိမ်ကိုလာတဲ့ဧည့်သည်ကို စိတ်ရှည် လက်ရှည် ဧည့်ခံတတ်တဲ့ဉာဉ်ရှိတတ်တယ်။\n\n", "တနင်္လာ": "မရဏနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲက မရဏနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် အလိုလိုက်ထားရင် သာယာပြီး စည်းနဲ့ကမ်းနဲ့ထားရင် ပေါက်ကွဲနိုင်တဲ့ဒိုင်းနမိုက် အိမ်ထောင်ရေးမျိုးဖြစ် ရမယ်။ မရဏနေ့သမီးဟာ ကိုယ့်အတွက် သူခိုးဓားပြနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ပေးပါလိမ့်မယ်။\n\n\nကိုယ်စိတ်တိုင်းကျ ထင်ရာမြင်ရာ လွတ်လွတ်လပ်လပ် နေခွင့်ပေးထားရင်တော့ သိပ်မဆိုးပါ။ အိမ်တွင်းမှာ စည်းကမ်း မရှိတတ်ဘူး။ ပရမ်းပတာဖြစ်မယ်။ တိုင်ပင် လို့မရပါ။ ပြောဆိုလို့မရပါ။ အင်မတန်မနေတတ်တဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ အလိုက်မသိ အရိပ်သုံးပါးမသိတဲ့သူဖြစ်မယ်။ ဟန်ကောင်းပြီး အပိုးမကျိုးတတ်ပါ။ ယောက်ျားရှာဖွေပေးတဲ့ပစ္စည်းတွေရော သူကိုယ်တိုင်ရှာတဲ့ပစ္စည်းတွေပါ ပါးစပ်က စည်းကမ်းရှိပြီး လက်တွေ့မှာ စည်းမဲ့ကမ်းမဲ့ လုပ်တတ်ပါတယ်။\n\n\nမကြာခဏ သဘောထားခြင်း မတိုက်ဆိုင်လို့ စကားများနေမယ်။ ရန်ဖြစ်ရ မယ်။ ရန်ဖြစ်ရင် အိမ်ကပစ္စည်းတွေ ပေါက်ခွဲ ဖျက်ဆီးတတ်တာ ဝါသနာပါတယ်။ ရှေ့နောက်မကြည့်တတ်ပါ။\n\n\nအိမ်ထောင်ရေးမှာ ပြဿနာတစ်ခုပြီးတစ်ခု လုပ်တတ်တယ်။ စီးပွားရေးမှာ ရေ ဆည်တဲ့ကန်သင်းမဟုတ်ဘဲစီးတဲ့ရေ ဖောက်ပေးတဲ့ မြောင်းပဲဖြစ်ပါမယ်။\n\n\nသားတွေ သမီးတွေထဲမှာလည်းကောင်းတဲ့ကလေး တွေလဲပါ နိုင်တယ်။ ဆိုးတဲ့ ကလေးတွေလဲပါမယ်။ တစ်ယောက်ကတော့ စုန်းပြူးဆိုတာပါလိမ့်မယ်။\n\n\nဒီလို မရဏနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ကိုယ်က အိမ်ထောင်ဖက် ထင်ရာမြင်ရာလုပ်တာကို သော်လည်းကောင်း၊မိန်းမ ဘက်အမျိုးတွေ ဝင်စွက်တာကို လည်းကောင်း၊ အိမ်ပါ သားမက် အဖြစ်လည်းကောင်း နေထိုင်နိုင်တယ်ဆိုရင် ယူနိုင် ပါတယ်။\n\n", "အင်္ဂါ": "အဓိပတိနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ခွင်ထဲက အဓိပတိနေ့သားသမီးနဲ့ အိမ်ထောင် ပြုခဲ့ရင် ဆင်းရဲသားနဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့် မယ်။ ဘဝမှာ အခက်အခဲ အမျိုးမျိုးကို မလိုအပ်ဘဲ ဖြေရှင်းနေရမယ်။\n\nအစကသည်းခံလိုက်ရင် ကောင်းနိုင်ပေမယ့် သည်းခံစိတ်မရှိ တဲ့အတွက် အိမ်တွင်းရေးမှာ အေးချမ်းခြင်းမရှိဘဲ တကျက်ကျက် ဖြစ်မယ်။ တစ်ယောက်ကို တစ်ယောက် နားလည် ခြင်း မရှိပါ။ ပြေလည်ရင်လဲအရမ်းပြေလည်ပြီး ရန်ဖြစ်ရင်လဲ အကြီး အကျယ်ရန်ဖြစ်တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စိတ်မငြိမ်တဲ့ အလိုက်မသိတဲ့ ဖြစ်ချင်တာတစ်ခုပဲသိတဲ့ အိမ်ထောင်ဖက်မျိုးရ နေမယ်။\n\nတစ်ချို့နေရာတွေမှာ သိလျက်သားနဲ့ သည်းခံရမယ်။ အပြောမတတ် အဆို မတတ်ဘဲ ငါတကောကောတဲ့ မိန်းမမျိုးရ လိမ့်မယ်။ အိမ်ထောင်ဖက်ကြောင့် စိုးရိမ် သောကများနေရမယ်။ စိတ်မချမ်းမသာဖြစ်နေရမယ်။\n\nအိမ်ထောင်ဖက်နဲ့ခွဲပြီး သီးခြား အလုပ်လုပ်ရင် မကောင်း တယ်။ လင်မယားနှစ် ယောက် အလုပ်တစ်ခုကိုအတူတူလုပ်ရင် တော့ မကြာခဏတကျက်ကျက် ဖြစ်နေ လိမ့်မယ်။ ပျော်စရာ မကောင်းဘဲအောင့်သက်သက်အိမ်ထောင်ရေးမျိုးကိုမနိုင်၍ သည်းခံ ရခြင်းမျိုးနဲ့ ပေါင်းသင်းနေသွားရလိမ့်မယ်။\n\nစိတ်ကိုဒုက္ခပေးမယ့် သားသမီးတွေကိုရမယ်။ ပြောရဆိုရ ခက်တဲ့ ကလေးတွေ ကိုရမယ်။ စီးပွားရှာတဲ့နေရာမှာလဲ လုပ်ငန်း အမျိုးမျိုး ပြောင်းနေရမယ်။ ကောင်း လာသလိုဖြစ်လိုက် ပျက်သွား လိုက် ဟုတ်သလိုဖြစ်နေလိုက်တန့်သွားလိုက်နဲ့ အားမလို အားမရ ဖြစ်နေမယ်။\n\nအိမ်ထောင်သက်ဘယ်လောက်ပဲကြာနေပါစေ သေတဲ့အထိ စကားများပြီး ရန်ဖြစ်ပြီးအခြေအတင်ပြောပြီး ပြီးသွားမယ်။ ဒါဟာလဲအကြီးအကျယ်မဟုတ်ဘဲ တစ်ယောက်နဲ့ တစ်ယောက် အားပြိုင်ရင်းနဲ့ စကားများတာပဲဖြစ်တယ်။\n\nမသိမသာကြင်နာမှု လိုက်လျောမှု တန်ဖိုးထားမှုတွေ ရှိပေ မယ့် အများရှေ့မှာ တော့ နောင်ဂျိမ်လင်မယားပါပဲ။ ပြီးတော့လဲ ပြီးသွားတာပါပဲ။", "ဗုဒ္ဓဟူး": "ရာဇနေ့သားသမီး\n\n\nကိုယ်မဟာဘုတ်ခွင်ထဲက ရာဇနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ ရင် ဆရာလုပ် တတ်တဲ့ အဓိပ္ပာယ်မဲ့စကားများတဲ့ မလိုအပ်ဘဲ ဩဇာပေးတတ်တဲ့ မိန်းမနဲ့ရမယ်။ တစ်ယောက်နဲ့တစ်ယောက် မကြာခဏစကားများမယ်။ တစ်ယောက်ကိုတစ်ယောက် နားလည် မှု လွဲမှားနေမယ်။\n\n\nအိမ်ထောင်ပြုခါစမှာ နှစ်ဘက်မိဘဆွေမျိုးအချင်းချင်းစကား များမယ်။ မ တည့်တတ်ပါ။ အိမ်တောင်မပြုခင်ကတည်းကနှစ်ဖက် အမျိုးတွေ ပြဿနာတက် မယ်။ ဇွတ်ယူမှရမယ်။ တကယ်လို့လက်ထပ်ပေးခဲ့ရင်သော်မှ မကျေနပ်ဘဲ အောင့်သက်သက်နဲ့ ပေးစားလိမ့် မယ်။ နောက်ဆုံးပြေလည်သွားမယ်။\n\n\nအိမ်တွင်းရေးမှာ မကြည်မလင်ဖြစ်မယ့်အပြင် လင်မယား နှစ်ယောက် မကြာခဏ ကြားစကားကြောင့်ရန်ဖြစ်ကြမယ်။ တစ် ယောက်ကိုတစ်ယောက် နည်း နည်းပါးပါးသည်းခံကြမယ်ဆိုရင် သိပ်ပြေလည်ပြီး အဆင်ပြေတဲ့အိမ်ထောင်ရေး ဖြစ်မယ်။\n\n\nရန်ဖြစ်ကြပေမယ့် တစ်ယောက်ကိုတစ်ယောက် ကြင်နာမှု ရှိကြမယ်။ တစ် ယောက်ကတစ်ယောက်ကို ချစ်လွန်းလို့ အစိုးရိမ် လွန်ပြီးပြောမိဆိုမိတဲ့အတွက် ပြော မှားဆိုမှားဖြစ်ကာရန်ဖြစ်ရတာ ဖြစ်ပါတယ်။ သားကောင်းသမီးရတနာနဲ့ ပြည့်စုံမယ်။ ပထမကလေးနည်းနည်းပါးပါးဆိုးမယ်။ ကျန်းမာရေး ချို့တဲ့မယ်။ မိန်းမဆရာလုပ်\n\nတာကိုသာခံနိုင်ရင် အိမ်ထောင်ရေး အထူးသာယာလိမ့်မယ်။သည်းမခံတတ်ရင်ဝေး မကြာခဏ ပေါက်ကွဲလိမ့်မယ်။\n\n", "ကြာသပတေး": "အထွန်းနေ့သားသမီး\n\nကိုယ့် မဟာဘုတ်ထဲကအထွန်းနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုမယ် ဆိုရင် အိမ်ထောင်ပြုကာစမှာ သိပ်မသာယာနိုင်ဘူး။ တဖြည်းဖြည်းနဲ့ သာယာလာမယ်။ အေးချမ်းလာမယ်။ ကြာလေလေ မိသားစုညီညွတ်ပြီး ဘဝမှာ အေးအေးချမ်းချမ်း နေရမယ်။ အိမ်ထောင်ပြုခါစ နှစ်နှစ်သုံးနှစ်လောက်ဟာ အကြောင်းမဲ့ ပြဿနာဖြစ် နေမယ်။ ရန်ဖြစ်နေမယ်။ တစ်ယောက်ကိုတစ်ယောက် ညှာညှာတာတာ နေတတ်ပေ မယ့် အဆင်မပြေရင် ထသတ်တတ်ကြမယ်။ ပြီးတော့လဲပြီးသွားကြမှာပဲ။ တစ် ယောက်နဲ့တစ်ယောက် တိုင်တိုင်ပင်ပင် ပြောဆိုကြံစည် ကြမယ်ဆိုရင် သိပ်ကောင်း တဲ့ အိမ်ထောင်ရေးဖြစ်တယ်။\n\nဒါပေမဲ့ တစ်ယောက်နဲ့ တစ်ယောက် နားလည်မှုလွဲမှားနေ တတ်တယ်။ ဘာမှ အရေးမကြီးတဲ့ကိစ္စတွေကို ရေးကြီးခွင်ကျယ် လုပ်တတ်မယ်။ - စီးပွားဖြစ်မယ်။ ချမ်းသာမယ်။ ဘဝမှာ ရည်မှန်းချက်တွေအားလုံး အောင်မြင်မယ်။သားကောင်းသမီး ရတနာရမယ်။ အိမ်ထောင်သက်ကြာ လာတဲ့အခါ တစ်ယောက်နဲ့တစ်ယောက် နားလည်လာကြလိမ့်မယ်။ ဒါပေမယ့် လူရှေ့သူရှေ့၊ ကလေးနှစ်ယောက်လို ရန်ဖြစ် တာမျိုးကတော့ တစ်သက်လုံးရှိနေမှာပဲ။ ပြေလည်တဲ့ အိမ်ထောင်ရေးပါ။ လက်ထပ် လို့ရပါတယ်။ ဘဝလဲသာယာလာမယ်။ အဆင်လဲပြေမယ်။\n\nနည်းနည်းပါးပါးတိမ်းစောင်းရင်တောင်မှ သတိရှိလို့ ပြေလည် တဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်တယ်။ စည်းနဲ့ ကမ်းနဲ့ နေတတ်ကြရင် ချမ်းသာဖို့ သိပ်လွယ် တဲ့အိမ်ထောင်ရေးပါ။ ပြီးတော့ ကိုယ်လိုတာကို ပုံဖော်လို့ရတဲ့ အိမ်ထောင်ရေးပါပဲ။\n\nတစ်ယောက်ယောက်ကယူသင့်ပါသလားလို့မေးရင် ကောင်း တယ် ယူလိုက်ပါ လို့ပြောရမယ့်အိမ်ထောင်ရေးပါပဲ။ ပြောစရာ တစ်ချက်ပဲရှိတယ်။ ယူမယ့် မိန်းမကတော့ အလှအပကြိုက်ရင် အရမ်းကြိုက်ပြီး တကယ်လို့ မကြိုက်တတ်ရင်လဲ အင်မတန်ကို ဘိုသီဘတ်သီဖြစ်ချင်သလိုဖြစ်နေတတ်တဲ့ မိန်းမမျိုး ဖြစ်တတ်တာ တစ်ခုပါပဲ။", "သောကြာ": "ဘင်္ဂနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ထဲကဘင်္ဂနေ့သားသမီးနဲ့ အိမ်ထောင်ပြုခဲ့ရင် ငရဲနဲ့ တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရလိမ့်မယ်။ အိမ်ထောင်ပြုကာစ ကတော့ န တဖြည်းဖြည်းနဲ့စိတ်ပျက်စရာကောင်းတဲ့ အိမ်ထောင်ဖက်မျိုးဖြစ်မယ်။ ထစ်က နဲဆိုရင် အများရှေ့မှာ သိက္ခာကျစရာ အပြုအမူတွေကို လုပ်ပြနေမယ်။ အမြဲတမ်း အားပြိုင်တဲ့ စကားတွေကို ပြောဆိုနေမယ်။ ဖြစ်လိုက်ရင်လဲ လူသိရှင်ကြား ရန်ဖြစ် ကြလိမ့်မယ်။ မယူခင်တုန်းက စိတ်ကူးယဉ်ထားသမျှ ယူပြီးမှ မှားလေခြင်းဆိုပြီး နောင်တရမယ်။\n\n\nအိမ်ထောင်သာယာမှုမရနိုင်ဘူး။ သာယာနေတယ်ဆိုရင်လည်းယာယီ သာယာ တာပဲဖြစ်မယ် ။ လက်ထပ်ပြီး လေးနှစ်အတွင်း ကိုယ့် အခြေအနေဟာ ယိုယွင်းလာ မယ်၊ ပျက်စီးလာမယ်။မိသားစု အချင်းချင်း စိတ်ဝမ်းကွဲစရာမျိုး ဖြစ်လာလိမ့်မယ်။\n\n\nအိမ်ထောင်ရေးမှာ ဆိတ်ငြိမ်နေတယ်ဆိုရင် ဖောက်ပြားမှု တစ်ခုခုရှိနေလို့ပါပဲ။ သားသမီးတွေကို ထိန်းမရသိမ်းမရဖြစ်မယ်။ ပြောလို့ ဆိုလို့မရဖြစ်မယ်။\n\n\nတစ်ယောက်နဲ့တစ်ယောက် သဘောထားခြင်းတိုက်ဆိုင်ဖို့ မလွယ်ပါ။ ပတ်ဝန်းကျင်က ဝင်စွက်ဖက်ခြင်းခံရတဲ့ အိမ်ထောင်ရေးမျိုးဖြစ်မယ်။\n\n\nအိမ်ထောင်ရေးသာယာတယ်ဆိုရင် ကျန်းမာရေးထိခိုက်တာမျိုး ဖြစ်မယ်။ ဒီ တော့ဘင်္ဂနေ့သမီးနဲ့ အိမ်ထောင်ပြုမယ်ဆိုရင် ဖြစ်ချင်ရာဖြစ် အားလုံးအကောင်းပဲဆို ပြီး စိတ်ကို ဒုံးဒုံးချနိုင်ရင်တော့ ယူနိုင်ပါတယ်။ ပျော်စေပျက်စေဆိုတဲ့စကားကို လည်းပျော်ပြီး တဖြည်းဖြည်းပျက်လာ တဲ့ ဘဝမျိုးရောက်လာတတ်ပါတယ်။\n\n\nကိုယ်ဖြစ်စေချင်တဲ့ အိမ်ထောင်ရေး၊ အခြေအနေနဲ့ လက်တွေ့ဖြစ်ရပ်နဲ့ တကယ်တမ်းကျတော့ တစ်ခြားစီဖြစ်နေတဲ့အပြင် ဘာမှလုပ်လို့မရတော့တဲ့ အခြေအနေမျိုးကို အောင့်သက်သက်နဲ့ ကြည့်နေရတော့တဲ့ဘဝကို ရောက်သွားနိုင်ပါ တယ်။\n\n", "စနေ": "ပုတိနေ့သားသမီး\n\n\nကိုယ့်မဟာဘုတ်ခွင်ထဲက ပုတိနေ့သမီးနဲ့အိမ်ထောင်ပြုခဲ့ရရင် အဟိတ်တိရိ စ္ဆာ န်နဲ့တူတဲ့ အိမ်ထောင်ရေးသုခကို ခံစားရပါလိမ့်မယ်။ အသိဉာဏ်မရှိ တစ်ဇွတ်ထိုး လုပ်ချင်ရာလုပ်တဲ့ အိမ်တောင်ဖက်မျိုးကို ရမယ်။ မကြာခဏရန်ဖြစ်မယ်။ အလိုက်ကမ်းဆိုးမသိဖြစ်မယ်။ တိုင်ပင်နှီးနှော ဆွေးနွေးလို့မရဘူးဖြစ်မယ်။\n\n\nသဝန်တိုမယ်၊ အပြောကြမ်းမယ်၊ စိတ်မှတ်ကြီးမယ်၊ ဒေါသ ကြီးမယ်၊ လူကြီးသူကြီးရှေ့မှာ ပြဿနာဖြစ်မယ်၊ မကြာခဏ ရန်ဖြစ်မယ်၊ အခုပြေလည်လိုက် အခုစကားများလိုက်ဖြစ်မယ်။ သားကောင်းသမီးရတနာတွေတော့မွေးမယ်။ အိမ်ထောင်ဖက်အပေါ် ကြောက်ပြီးစိတ်ပျက်ပြီးအောင့်သက်သက်နဲ့ ပေါင်းသင်းနေရ မယ်။\n\n\nတစ်ချို့ကျပြန်တော့ အလိုက်မသိ နားလည်မှုကွဲ လွဲမှားတတ်မယ်။ ရိုးရိုးအအ ထုံထုံထိုင်းထိုင်းဖြစ်ကာ အိမ်ထောင်ဖက်အပေါ် နားမလည်တတ်ပါ။ စကားနားမ ထောင်တတ်ပါ။စကားအချေ အတင် ပြောတာနဲ့ ရန်ဖြစ်ဖို့တာစူလာတတ်ပါတယ်။ ဒါ ကြောင့် ဒီပုတိနေ့ သားသမီးကိုယူမယ်ဆိုရင် သည်းခံနိုင်ရင် စိတ်ရှည်နိုင်ရင် ဥပေက္ခာ ပြုနိုင်ရင် စိတ်ကိုလျှော့နိုင်ရင် ယူနိုင်ပါတယ်။\n\n\nနို့မဟုတ်ရင်တော့ ကွဲဖို့သိပ်နီးစပ်ပါတယ်။ သိသူနဲ့ မသိသူ နားလည်သူနဲ့ နားမ လည်သူ အလိုက်သိသူနဲ့ အလိုက်မသိသူတို့ ပေါင်းရ တဲ့ အခြေအနေပါပဲ။ တစ် ယောက်ကိုတစ်ယောက်က တန်ဖိုးမထားဘဲ အနိုင်ကျင့်စေတဲ့ အိမ်ထောင်ရေးမျိုးပါပဲ။\n\n"}};
function msannPartner(remainder, day) { return { reading: partnerReadings[remainder]?.[weekdaysMM[day]] || "" }; }
