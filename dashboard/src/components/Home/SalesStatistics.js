import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <iframe 
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0",
              width: "100%",
              height: "350px"
            }}
            width="640" 
            height="480" 
            src="https://charts.mongodb.com/charts-project-0-ixvyl/embed/charts?id=6272e675-725e-4716-8af9-06ca38e32c5e&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
