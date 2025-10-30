import React from "react";

export function UserSection() {
  return (
    <div
      style={{
        fontFamily: "Noto Sans Devanagari, sans-serif",
        lineHeight: "1.8",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h4 style={{ textAlign: "right" }}>पान क्र. २</h4>

      <p>
        ब) खातेमध्ये मंजूर केलेली मदत माझे <br />
        <b>दि. स्वराज सेवक को-ऑपरेटिव्ह बँक लि., सातारा</b> <br />
        शाखा{" "}
        <input
          type="text"
          style={{
            border: "none",
            borderBottom: "1px solid #000",
            width: "200px",
          }}
        />{" "}
        मध्ये ठेव खाते क्र.{" "}
        <input
          type="text"
          style={{
            border: "none",
            borderBottom: "1px solid #000",
            width: "220px",
          }}
        />{" "}
        या खात्यावर वर्ग करावी.
      </p>

      <p>
        अर्जात वर लिहिलेली माहिती खरी व बरोबर आहे. त्यामध्ये काही चुकीचे आढळल्यास
        त्याबाबत संस्थेकडून माझ्यावर/माझ्या कुटुंबावर कारवाई होईल याची मला पूर्ण
        जाणीव आहे. तरी माझा अर्ज सहानुभूतीपूर्वक विचार करून फंडकडून मदत मिळावी
        अशी नम्र विनंती आहे.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              width: "150px",
              height: "70px",
              border: "1px dashed #555",
              marginBottom: "5px",
            }}
          >
            (स्वाक्षरीसाठी जागा)
          </div>
          <p>अर्जदाराची सही</p>
        </div>
      </div>
    </div>
  );
}

export function AdminSection() {
  return (
    <div
      style={{
        fontFamily: "Noto Sans Devanagari, sans-serif",
        lineHeight: "1.8",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <p>
        शाखाप्रमुख यांचेमार्फत स्वाक्षरी – <br />
        अर्जदाराने वरील नमूद केलेली माहिती बरोबर असल्याचे प्रमाणित करण्यात
        येते. त्यांनी अर्जदाराची कुटुंबातील परिस्थिती अत्यंत हालाखीची असल्याचे
        सांगितले असून, मदतीची गरज आहे. अर्जावर दिलेली माहिती खरी आहे / नाही.
      </p>

      <div
        style={{
          color:"gray-100",
          border: "1px dashed #555",
          height: "80px",
          width: "200px",
          marginTop: "10px",
          marginBottom: "10px",
          textAlign: "center",
          lineHeight: "80px",
        }}
      >
        (शाखा प्रमुखाची सही व शिक्का)
      </div>

      <p>
        ______________________________ <br />
        दिनांक: ______________________
      </p>

      <hr style={{ margin: "30px 0" }} />

      <p>
        <b>टीप –</b> सेवकाच्या आजारातील खर्चाची एकूण रक्कम रु. ५० हजारांपर्यंत
        जात असल्यास अशा अर्जास विभागीय अधिकारी यांचे निरीक्षण आवश्यक आहे.
      </p>

      <p>
        १) सेवकाच्या आजारातील खर्चाची एकूण रक्कम रु. ५० हजारांपर्यंत असल्यास
        संबंधित अर्ज सेवक कल्याणकर फंड कार्यालयाकडे पाठवावा.
      </p>

      <p>
        २) अर्जासोबत जोडलेली सर्व बिले सत्यप्रत (True Copy) करणे आवश्यक आहे.
      </p>

      <p>
        ३) अर्जासोबत मागील वर्षी शाखेद्वारे सेवक कल्याणकर फंड शाखेची आणि कपात
        याची जोडणी आवश्यक आहे.
      </p>
    </div>
  );
}

export function SuperAdminSection() {
  return (
    <div
      style={{
        fontFamily: "Noto Sans Devanagari, sans-serif",
        lineHeight: "1.8",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <p>
        ४) सेवक कल्याणकर फंडकडून शाखेमार्फत सादर केलेल्या अर्जावर
        प्रमुखाध्यापकांनी सही केलेला अर्ज, सेवक स्वतःची, पत्नी, सेवकाचा
        मुलगा/मुलगी, माता/पिता, बहिण, भाऊ यांच्या सेवकांच्या आजाराच्या
        परिस्थितीचा उल्लेख करून देणे आवश्यक आहे.
      </p>

      <p>
        माझ्या माहितीनुसार अर्जात दिलेली माहिती व परिस्थिती विचारात घेऊन रु.{" "}
        <input
          type="text"
          style={{
            border: "none",
            borderBottom: "1px solid #000",
            width: "150px",
          }}
        />{" "}
        मदत देण्यात यावी अशी शिफारस आहे.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        <div>
          <p>ठिकाण: ______________________</p>
          <p>दिनांक: ______________________</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "180px",
              height: "70px",
              border: "1px dashed #555",
              marginBottom: "5px",
            }}
          >
            (विभागीय अधिकाऱ्याची सही व शिक्का)
          </div>
        </div>
      </div>
    </div>
  );
}
