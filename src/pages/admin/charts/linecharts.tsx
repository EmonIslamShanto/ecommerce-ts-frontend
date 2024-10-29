import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useGetLineQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/loader";
import { lastMonths } from "../../../utils/features";
import { Navigate } from "react-router-dom";

const { last12Months } = lastMonths();

const Linecharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = useGetLineQuery(user?._id!);

  const charts = data?.charts;

  if (isError) return <Navigate to="/admin/dashboard" />;
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading ? <SkeletonLoader length={20} /> : (
            <>
              <h1>Line Charts</h1>
              <section>
                <LineChart
                  data={charts?.user ?? []}
                  label="Users"
                  borderColor="rgb(53, 162, 255)"
                  labels={last12Months}
                  backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2>Active Users</h2>
              </section>

              <section>
                <LineChart
                  data={ charts?.product ?? []}
                  backgroundColor={"hsla(269,80%,40%,0.4)"}
                  borderColor={"hsl(269,80%,40%)"}
                  labels={last12Months}
                  label="Products"
                />
                <h2>Total Products (SKU)</h2>
              </section>
              <section>
                <LineChart
                  data={charts?.revenue ?? []}
                  backgroundColor={"hsla(129,80%,40%,0.4)"}
                  borderColor={"hsl(129,80%,40%)"}
                  label="Revenue"
                  labels={last12Months}
                />
                <h2>Total Revenue </h2>
              </section>

              <section>
                <LineChart
                  data={charts?.discount ?? []}
                  backgroundColor={"hsla(29,80%,40%,0.4)"}
                  borderColor={"hsl(29,80%,40%)"}
                  label="Discount"
                  labels={last12Months}
                />
                <h2>Discount Allotted </h2>
              </section>
            </>
          )
        }


      </main>
    </div>
  );
};

export default Linecharts;
