import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useGetBarQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/loader";
import { lastMonths } from "../../../utils/features";
import { Navigate } from "react-router-dom";

const { last12Months, last6Months} = lastMonths();

const Barcharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = useGetBarQuery(user?._id!);
  

  const charts = data?.charts;
  if (isError) return <Navigate to="/admin/dashboard" />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading ? <SkeletonLoader length={20} /> : (
            <>
            <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_2={charts?.user ?? []}
            data_1={charts?.product ?? []}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
            labels={last6Months}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={charts?.order ?? []}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={last12Months}
          />
          <h2>Orders throughout the year</h2>
        </section>
            </>
          )
        }
      </main>
    </div>
  );
};

export default Barcharts;
