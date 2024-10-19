const states = {
Bloemfontein: 0.79,
Cape_Town: 0.91,
Durban: 0.11,
Johannesburg: 1.21,
Pretoria: 2.1,
Port_Elizabeth: 1.3,
East_London: 1.37,
Polokwane: 0.84,
Mbombela: 0.9,
Kimberley: 1.05,
George: 0.71,
Bloemfontein: 1.02,
Pietermaritzburg: 1.27,
Rustenburg: 0.26,
Welkom: 0.81,
Vereeniging: 1.68,
Nelspruit: 0.7,
Bellville: 0.13,
Mossel_Bay: 1.33,
Johannesburg: 1.68,
Sandton: 1.26,
Mthatha: 1.56,
Oudtshoorn: 0.42,
Swellendam: 0.65,
Polokwane: 1.41,
Grahamstown: 0.88,
Stellenbosch: 0.96,
Worcester: 0.97,
Johannesburg: 1.21,
Knysna: 1.04,
Klerksdorp: 1.13,
Bellville: 0.91,
Rustenburg: 1.69,
Vanderbijlpark: 1.61,
Paarl: 0.12,
Mafikeng: 1.29,
  };
  
  const emissionFactor = {
    electricity: states,
    fuel: 2.32,
    lpg: 1.8,
    waste: 0.44,
  };
  const usage = {};
  
  const emission = {};
  
  const select_state = document.getElementById("select-state");
  const form_container = document.getElementById("form-container")
  const result_container = document.getElementById("result-container");
  const result_output = document.getElementById("result-output")
  const success = document.getElementById("success");
  const danger = document.getElementById("danger");
  const electricity_output = document.getElementById("electricity-output");
  const electricity_result = document.getElementById("electricity-result");
  const fuel_output = document.getElementById("fuel-output");
  const fuel_result = document.getElementById("fuel-result");
  const lpg_output = document.getElementById("lpg-output");
  const lpg_result = document.getElementById("lpg-result");
  const waste_output = document.getElementById("waste-output");
  const waste_result = document.getElementById("waste-result");
  const members_input = document.getElementById("members-input");
  let state_input = 0;
  let totalEmission =0 ;
  
  //adding opptions to the select-state using js
  for (const state in states) {
    let newOption = new Option(state, state);
    select_state.add(newOption, undefined);
  }
  
  //onclcick
  function onSubmition() {
    store();
    calculate();
    display()
  }
  
  // storing values selected by user in object
  function store() {
    usage.electricity = document.getElementById("electricity-input").value * 12;
  
    usage.fuel =
      (document.getElementById("distance-input").value /
        document.getElementById("mileage-input").value) *
      365;
  
    usage.lpg = document.getElementById("lpg-input").value * 24;
  
    usage.waste = document.getElementById("waste-input").value * 52;
  
    state_input = select_state.options[select_state.selectedIndex].value;
  
    //    for (const use in usage) {
    //     console.log(`${use} : ${usage[use]}`);
    //   }
    //    console.log(state_input)
  }
  
  //calculating emission
  function calculate() {
      console.log(state_input)
    emission.electricity = usage.electricity * states[state_input];
  
    emission.fuel = usage.fuel * emissionFactor["fuel"];
  
    emission.lpg = usage.lpg * emissionFactor["lpg"];
  
    emission.waste = usage.waste * emissionFactor["waste"];
  
    for(const emit in emission){
        totalEmission += emission[emit] / members_input.value 
    }
  }
  
  
  //display
  function display(){
      result_container.style.display = "block"
      form_container.style.display = "none"
  
      result_output.innerText = Math.round((totalEmission/1000) * 100) / 100 
      electricity_result.innerText =  Math.round((emission.electricity/members_input.value) * 100) / 100
      fuel_result.innerText = Math.round((emission.fuel/members_input.value) * 100) / 100
      lpg_result.innerText = Math.round((emission.lpg/members_input.value)* 100) / 100
      waste_result.innerText = Math.round((emission.waste/members_input.value)* 100) / 100
      if(totalEmission<=2000){
          success.style.display = "block"
      }
      else{
          danger.style.display = "block"
          if ((emission.electricity / members_input.value  )<= 1100 ? false:true) {
             electricity_output.style.display = "block"
            }
            if ((emission.fuel / members_input.value ) <= 400 ? false:true) {
              fuel_output.style.display = "block"
            }
            if ((emission.lpg / members_input.value ) <= 100 ? false:true) {
              lpg_output.style.display = "block"
            }
            if ((emission.waste / members_input.value ) <= 400 ? false:true) {
              waste_output.style.display = "block"
              
            }
      }
  
  }