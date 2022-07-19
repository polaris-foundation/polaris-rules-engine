# Polaris Rules Engine

The Rules Engine is part of the Polaris platform (formerly DHOS). This service is  a Node.js microservice to expose an API for a rules engine.

The rules engine is "JSON Rules Engine" (https://github.com/CacheControl/json-rules-engine)

**This service is intended to be wrapped by the Polaris PDF API.** This service is expected to be running locally. For this reason, the API exposed by the Rules Engine is not protected by endpoint security.

# Running locally

```bash
yarn install
yarn build
yarn test
yarn start
```

# Running in Docker

```bash
docker build -t dhos-rules-engine/v18.1 . # once
docker run -p 3000:3000 -t dhos-rules-engine/v18.1
```

# Using rules in the browser

The service exposes each rule type as an importable script. It requires an import of `moment.js`.

Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.js"></script>
    <script src="https://dev.sensynehealth.com/dhos-rules/dhos/v1/rule_definition/news2.bundle.js"></script>
    <script src="https://dev.sensynehealth.com/dhos-rules/dhos/v1/rule_definition/meows.bundle.js"></script>
    <script src="https://dev.sensynehealth.com/dhos-rules/dhos/v1/rule_definition/bloodGlucoseReadingBanding.bundle.js"></script>
    <script>
      await news2({
        time: "2018-01-01T00:00:00.000Z",
        respiratory_rate: 25,
        heart_rate: 131,
        oxygen_saturation: 97,
        spo2_scale: 2,
        o2_therapy: 2,
        o2_therapy_mask: "Venturi",
        systolic_blood_pressure: 220,
        consciousness_acvpu: "pain",
        temperature: 39.1,
        config: {
          zero_severity_interval_hours: 12,
          low_severity_interval_hours: 6,
          low_medium_severity_interval_hours: 1,
          medium_severity_interval_hours: 1,
          high_severity_interval_hours: 0
        }
      });
      await meows({
        time: "2018-01-01T00:00:00.000Z",
        respiratory_rate: 25,
        heart_rate: 131,
        oxygen_saturation: 97,
        o2_therapy: 2,
        o2_therapy_mask: "Venturi",
        systolic_blood_pressure: 220,
        diastolic_blood_pressure: 100,
        consciousness_acvpu: "pain",
        temperature: 39.1,
        config: {
          zero_severity_interval_hours: 12,
          low_severity_interval_hours: 6,
          low_medium_severity_interval_hours: 1,
          medium_severity_interval_hours: 1,
          high_severity_interval_hours: 0
        }
      });
      await bloodGlucoseReadingBanding({
        blood_glucose_value: 3.9,
        prandial_tag_id: "PRANDIAL-TAG-AFTER-BREAKFAST"
      });
    </script>
  </head>
  <body></body>
</html>
```

# Licences

`yarn licenses --generate-disclaimer` is used to aggregate licences as part of the Docker build. They are available under `/rule_definition/licences.txt`
