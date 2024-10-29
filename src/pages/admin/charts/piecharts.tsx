import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import {categories} from "../../../assets/data.json";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetPieQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/loader";
import { Navigate } from "react-router-dom";

const PieCharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = useGetPieQuery(user?._id!);


  const charts = data?.charts;

  if (isError) return <Navigate to="/admin/dashboard" />;


  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading ? <SkeletonLoader length={20} /> : (
            <>
            <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[charts?.orderStatus.processing ?? 0,
                charts?.orderStatus.shipped ?? 0,
                charts?.orderStatus.delivered ?? 0]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={charts?.productCatergories.map((i: Record<string, number>) => Object.keys(i)[0]) || []}
              data={charts?.productCatergories.map((i: Record<string, number>) => Object.values(i)[0]) || []}
              backgroundColor={categories.map(
                (i) => {
                  const value = Number(Object.values(i)[0]);
                  return `hsl(${value * 4}, ${value}%, 50%)`;
                }
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2>Product Categories Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[charts?.stockAvailable.inStock ?? 0, charts?.stockAvailable.outOfStock ?? 0]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2> Stock Availability</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={[
                "Total Revenue",
                "Discount",
                "Tax",
                "Shipping Cost",
                "Net Margin",
              ]}
              data={[
                charts?.revenueDistribution.totalRevenue ?? 0,
                charts?.revenueDistribution.totalDiscount ?? 0,
                charts?.revenueDistribution.totalTax ?? 0,
                charts?.revenueDistribution.totalShipping ?? 0,
                charts?.revenueDistribution.netmargin ?? 0
              ]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[
                charts?.ageGroup.teen ?? 0, 
                charts?.ageGroup.adult ?? 0, 
                charts?.ageGroup.older ?? 0]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[
                charts?.users.admin ?? 0,
                charts?.users.customer ?? 0]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 50]}
            />
          </div>
        </section>
            </>
          )
        }
      </main>
    </div>
  );
};

export default PieCharts;
