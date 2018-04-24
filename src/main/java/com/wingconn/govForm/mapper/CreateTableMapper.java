package com.wingconn.govForm.mapper;

import com.wingconn.govForm.domain.TableFields;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ZD.
 *         Description:
 * @since 2017-06-20 11:30.
 */
@Mapper
public interface CreateTableMapper {

    /**
     * 修改数据库的表名字
     * @param originalTableName
     * @param newTableName
     * @return
     */
    int alterTableName(@Param("originalTableName") String originalTableName,
                       @Param("newTableName") String newTableName);

    /**
     * truncate指定数据库表的数据
     * @param tableName
     * @return
     */
    int truncateTable(@Param("tableName") String tableName);

    /**
     * 根据传入的声明，创建新的表并且将原表的数据插入到新的表中
     * @param newTableName
     * @param originalTableName
     */
    void createNewTableAndInsertData(@Param("newTableName") String newTableName,
                                     @Param("originalTableName") String originalTableName);

    /**
     * 统计某张表中的总数据条数
     * @param tableName
     * @return
     */
    int getRecordCount(@Param("tableName") String tableName);

    /**
     * 获取当前数据库的名字
     * @return
     */
    String getCurDataBaseName();

    /**
     * 从指定数据库中，查询是否存在某张表
     * @param tableName
     * @return
     */
    String isTargetTableExistInDB(@Param("tableName") String tableName);

    /**
     * 创建一个新表
     * @param tableName
     * @param tableStatement
     */
    void createNewTable(@Param("tableName") String tableName,
                        @Param("tableStatement") String tableStatement);

    /**
     * 获得表字段
     * @param tableName
     * @return
     */
    List<String> showFields(@Param("tableName") String tableName);

    /**
     * 获取指定表字段
     * @param tableName
     * @return
     */
    List<TableFields> showTableFields(@Param(value = "tableName") String tableName);

    /**
     * 向指定的表中添加字段
     * @param tableName
     * @param fields
     * @return
     */
    void addField(@Param(value = "tableName") String tableName,
                  @Param(value = "fields") List<String> fields);
}
