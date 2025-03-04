import postgres from "postgres";

const DB_HOST = process.env.DB_HOST || 'localhost';
const POSTGRES_URL=`postgres://postgres:engineTest888@${DB_HOST}:5555/zesty`

const sql = postgres(POSTGRES_URL);

export const getProperties = async () => {
  const properties = await
    sql`SELECT *, ST_X (geocode_geo::geometry) AS long, ST_Y (geocode_geo::geometry) AS lat FROM properties`;

  return properties;
}

export const findProperties = async (coordinates, distance) => {
  const properties =   await sql`SELECT *, ST_X (geocode_geo::geometry) AS long, ST_Y (geocode_geo::geometry) AS lat FROM properties p WHERE ST_DWithin(p.geocode_geo, ST_POINT(${coordinates[0]}, ${coordinates[1]}), ${distance});`;
  return properties;
}

export const getImageUrl = async (id) => {
  const imageUrl = await sql`SELECT image_url from properties WHERE id = ${id}`;
  return imageUrl;
}